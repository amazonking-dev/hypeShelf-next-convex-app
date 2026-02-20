import { QueryCtx, MutationCtx } from "./_generated/server";

/**
 * Security utilities for Convex functions
 * Provides authentication and authorization helpers
 */

/**
 * Get the authenticated user's Clerk ID
 * Throws an error if user is not authenticated
 */
export async function getAuthenticatedUserId(ctx: QueryCtx | MutationCtx): Promise<string> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthorized: Authentication required");
  }
  return identity.subject; // Clerk user ID
}

/**
 * Check if the current user is an admin
 * Returns false if user is not authenticated or not in users table
 */
export async function isAdmin(ctx: QueryCtx | MutationCtx, userId: string): Promise<boolean> {
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", userId))
    .first();

  return user?.role === "admin";
}

/**
 * Require admin role - throws error if user is not admin
 */
export async function requireAdmin(ctx: QueryCtx | MutationCtx): Promise<string> {
  const userId = await getAuthenticatedUserId(ctx);
  const admin = await isAdmin(ctx, userId);

  if (!admin) {
    throw new Error("Unauthorized: Admin access required");
  }

  return userId;
}

/**
 * Check if user is the owner of a resource
 */
export function isOwner(userId: string, resourceAuthorId: string): boolean {
  return userId === resourceAuthorId;
}

/**
 * Require ownership or admin role
 * Throws error if user is neither owner nor admin
 */
export async function requireOwnerOrAdmin(
  ctx: QueryCtx | MutationCtx,
  resourceAuthorId: string
): Promise<string> {
  const userId = await getAuthenticatedUserId(ctx);
  const userIsOwner = isOwner(userId, resourceAuthorId);
  const userIsAdmin = await isAdmin(ctx, userId);

  if (!userIsOwner && !userIsAdmin) {
    throw new Error("Unauthorized: You must be the owner or an admin");
  }

  return userId;
}
