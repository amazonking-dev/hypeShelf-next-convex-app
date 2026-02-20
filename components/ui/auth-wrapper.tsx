"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: "admin" | "user";
}

export function AuthWrapper({
  children,
  requireAuth = false,
  requireRole,
}: AuthWrapperProps) {
  const { isLoaded, userId, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (requireAuth && !isSignedIn) {
      router.push("/sign-in");
      return;
    }

    // Role-based access control can be added here
    // when we implement role checking from Clerk metadata
    if (requireRole && isSignedIn) {
      // TODO: Check user role from Clerk metadata
      // This will be implemented when we set up role management
    }
  }, [isLoaded, isSignedIn, requireAuth, requireRole, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (requireAuth && !isSignedIn) {
    return null;
  }

  return <>{children}</>;
}
