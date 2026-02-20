import { auth, currentUser } from "@clerk/nextjs/server";

export type UserRole = "admin" | "user";

/**
 * Get the current authenticated user's role
 * Roles are stored in Clerk's public metadata
 */
export async function getUserRole(): Promise<UserRole | null> {
  try {
    const user = await currentUser();
    if (!user) return null;

    // Get role from Clerk's public metadata
    const role = user.publicMetadata?.role as UserRole | undefined;
    
    // Default to "user" if no role is set
    return role === "admin" ? "admin" : "user";
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole();
  return role === "admin";
}

/**
 * Get the current user's ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { userId } = await auth();
    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}
