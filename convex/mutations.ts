import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthenticatedUserId, requireAdmin, requireOwnerOrAdmin } from "./auth";
import { validateRecommendationInput } from "./validation";
import { GENRES } from "../types";


/**
 * Create a new recommendation
 * Requires authentication
 */
export const createRecommendation = mutation({
  args: {
    title: v.string(),
    genre: v.string(),
    link: v.string(),
    blurb: v.string(),
    authorName: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user's ID (throws if not authenticated)
    const authorId = await getAuthenticatedUserId(ctx);

    // Validate and sanitize input
    const validation = validateRecommendationInput(
      {
        title: args.title,
        genre: args.genre,
        link: args.link,
        blurb: args.blurb,
      },
      GENRES
    );

    if (!validation.isValid || !validation.sanitized) {
      throw new Error(validation.error || "Invalid input");
    }

    // Create the recommendation with sanitized input
    const recommendationId = await ctx.db.insert("recommendations", {
      title: validation.sanitized.title,
      genre: validation.sanitized.genre,
      link: validation.sanitized.link,
      blurb: validation.sanitized.blurb,
      authorId,
      authorName: args.authorName.trim(),
      isStaffPick: false,
    });

    return recommendationId;
  },
});

/**
 * Delete a recommendation
 * User must be the owner OR an admin
 */
export const deleteRecommendation = mutation({
  args: {
    id: v.id("recommendations"),
  },
  handler: async (ctx, args) => {
    // Get the recommendation
    const recommendation = await ctx.db.get(args.id);
    if (!recommendation) {
      throw new Error("Recommendation not found");
    }

    // Require user to be owner or admin (throws if not authorized)
    await requireOwnerOrAdmin(ctx, recommendation.authorId);

    // Delete the recommendation
    await ctx.db.delete(args.id);

    return { success: true };
  },
});

/**
 * Toggle staff pick status of a recommendation
 * Only admins can perform this action
 */
export const toggleStaffPick = mutation({
  args: {
    id: v.id("recommendations"),
  },
  handler: async (ctx, args) => {
    // Require admin role (throws if not admin)
    await requireAdmin(ctx);

    // Get the recommendation
    const recommendation = await ctx.db.get(args.id);
    if (!recommendation) {
      throw new Error("Recommendation not found");
    }

    // Toggle the staff pick status
    const newStaffPickStatus = !recommendation.isStaffPick;
    await ctx.db.patch(args.id, {
      isStaffPick: newStaffPickStatus,
    });

    return { success: true, isStaffPick: newStaffPickStatus };
  },
});
