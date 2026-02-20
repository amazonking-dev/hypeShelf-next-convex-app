import { Doc, Id } from "@/convex/_generated/dataModel";

/**
 * Type definitions for HypeShelf
 * These types are derived from the Convex schema
 */

// Recommendation types
export type Recommendation = Doc<"recommendations">;
export type RecommendationId = Id<"recommendations">;

// User types
export type User = Doc<"users">;
export type UserId = Id<"users">;

// User role type
export type UserRole = "admin" | "user";

// Input types for creating recommendations
export interface CreateRecommendationInput {
  title: string;
  genre: string;
  link: string;
  blurb: string;
}

// Input types for creating users
export interface CreateUserInput {
  clerkUserId: string;
  role: UserRole;
  email: string;
}

// Genre options (commonly used genres)
export const GENRES = [
  "action",
  "adventure",
  "comedy",
  "drama",
  "horror",
  "romance",
  "sci-fi",
  "thriller",
  "documentary",
  "animation",
  "fantasy",
  "mystery",
  "other",
] as const;

export type Genre = (typeof GENRES)[number];
