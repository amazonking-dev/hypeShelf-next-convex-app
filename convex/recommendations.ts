import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get the latest N recommendations for the public page
 * Ordered by creation time (newest first)
 */
export const getLatestRecommendations = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10; // Default to 10 if not specified

    const recommendations = await ctx.db
      .query("recommendations")
      .order("desc")
      .take(limit);

    return recommendations;
  },
});

/**
 * Get all recommendations (for authenticated users)
 * Ordered by creation time (newest first)
 */
export const getAllRecommendations = query({
  handler: async (ctx) => {
    const recommendations = await ctx.db
      .query("recommendations")
      .order("desc")
      .collect();

    return recommendations;
  },
});

/**
 * Get recommendations filtered by genre
 * Ordered by creation time (newest first)
 */
export const getRecommendationsByGenre = query({
  args: {
    genre: v.string(),
  },
  handler: async (ctx, args) => {
    const recommendations = await ctx.db
      .query("recommendations")
      .withIndex("by_genre", (q) => q.eq("genre", args.genre))
      .order("desc")
      .collect();

    return recommendations;
  },
});

/**
 * Get recommendations created by a specific user
 * Ordered by creation time (newest first)
 */
export const getUserRecommendations = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const recommendations = await ctx.db
      .query("recommendations")
      .withIndex("by_author", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .collect();

    return recommendations;
  },
});

/**
 * Get all staff picks
 * Ordered by creation time (newest first)
 */
export const getStaffPicks = query({
  handler: async (ctx) => {
    const recommendations = await ctx.db
      .query("recommendations")
      .withIndex("by_staff_pick", (q) => q.eq("isStaffPick", true))
      .order("desc")
      .collect();

    return recommendations;
  },
});

/**
 * Get a single recommendation by ID
 */
export const getRecommendationById = query({
  args: {
    id: v.id("recommendations"),
  },
  handler: async (ctx, args) => {
    const recommendation = await ctx.db.get(args.id);
    return recommendation;
  },
});
