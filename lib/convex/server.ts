import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

// Server-side Convex client for use in server components and API routes
export const convexHttpClient = new ConvexHttpClient(convexUrl);

// Helper to get authenticated Convex client
// This will be used when we need to pass Clerk auth tokens to Convex
export function getAuthenticatedConvexClient(authToken: string) {
  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  }
  const client = new ConvexHttpClient(convexUrl);
  client.setAuth(authToken);
  return client;
}
