import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Helper function to validate URL format
 */
function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Helper function to validate input fields
 */
function validateRecommendationInput(input: {
  title: string;
  genre: string;
  link: string;
  blurb: string;
}): { isValid: boolean; error?: string } {
  if (!input.title || input.title.trim().length === 0) {
    return { isValid: false, error: "Title is required" };
  }
  if (input.title.length > 200) {
    return { isValid: false, error: "Title must be 200 characters or less" };
  }

  if (!input.genre || input.genre.trim().length === 0) {
    return { isValid: false, error: "Genre is required" };
  }

  if (!input.link || input.link.trim().length === 0) {
    return { isValid: false, error: "Link is required" };
  }
  if (!isValidUrl(input.link)) {
    return { isValid: false, error: "Link must be a valid URL" };
  }

  if (!input.blurb || input.blurb.trim().length === 0) {
    return { isValid: false, error: "Blurb is required" };
  }
  if (input.blurb.length > 500) {
    return { isValid: false, error: "Blurb must be 500 characters or less" };
  }

  return { isValid: true };
}

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
    // Get the authenticated user's identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: You must be signed in to create a recommendation");
    }

    const authorId = identity.subject; // Clerk user ID

    // Validate input
    const validation = validateRecommendationInput({
      title: args.title,
      genre: args.genre,
      link: args.link,
      blurb: args.blurb,
    });

    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Create the recommendation
    const recommendationId = await ctx.db.insert("recommendations", {
      title: args.title.trim(),
      genre: args.genre.trim(),
      link: args.link.trim(),
      blurb: args.blurb.trim(),
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
    // Get the authenticated user's identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: You must be signed in to delete a recommendation");
    }

    const userId = identity.subject; // Clerk user ID

    // Get the recommendation
    const recommendation = await ctx.db.get(args.id);
    if (!recommendation) {
      throw new Error("Recommendation not found");
    }

    // Check if user is the owner
    const isOwner = recommendation.authorId === userId;

    // Check if user is admin (from Clerk metadata)
    // Note: In a real implementation, you might want to check Clerk metadata
    // or store roles in Convex. For now, we'll check if user exists in users table
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", userId))
      .first();

    const isAdmin = user?.role === "admin";

    // Only allow deletion if user is owner or admin
    if (!isOwner && !isAdmin) {
      throw new Error(
        "Unauthorized: You can only delete your own recommendations unless you are an admin"
      );
    }

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
    // Get the authenticated user's identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: You must be signed in");
    }

    const userId = identity.subject; // Clerk user ID

    // Check if user is admin
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", userId))
      .first();

    const isAdmin = user?.role === "admin";

    if (!isAdmin) {
      throw new Error("Unauthorized: Only admins can mark recommendations as staff picks");
    }

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
