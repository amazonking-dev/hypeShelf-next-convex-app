import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Convex schema definition for HypeShelf
 */
export default defineSchema({
  recommendations: defineTable({
    title: v.string(),
    genre: v.string(),
    link: v.string(),
    blurb: v.string(),
    authorId: v.string(), // Clerk user ID
    authorName: v.string(), // User's display name
    isStaffPick: v.boolean(),
  })
    .index("by_author", ["authorId"])
    .index("by_genre", ["genre"])
    .index("by_staff_pick", ["isStaffPick"]),
});
