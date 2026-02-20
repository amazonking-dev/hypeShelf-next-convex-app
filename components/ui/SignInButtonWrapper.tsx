"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SignInButtonWrapperProps {
  children: React.ReactNode;
  redirectUrl?: string;
}

export function SignInButtonWrapper({
  children,
  redirectUrl = "/recommendations",
}: SignInButtonWrapperProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(redirectUrl);
    }
  }, [isLoaded, isSignedIn, redirectUrl, router]);

  if (!isLoaded) {
    return (
      <button
        disabled
        className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gray-400 rounded-lg cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  if (isSignedIn) {
    return (
      <button
        onClick={() => router.push(redirectUrl)}
        className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Go to Recommendations
      </button>
    );
  }

  return (
    <SignInButton mode="modal" fallbackRedirectUrl={redirectUrl}>
      {children}
    </SignInButton>
  );
}
