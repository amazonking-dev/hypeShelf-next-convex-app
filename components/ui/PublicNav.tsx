"use client";

import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";

export function PublicNav() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header
      className="border-b border-gray-200 bg-white/80 backdrop-blur-sm"
      role="banner"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-gray-700"
            aria-label="HypeShelf home"
          >
            HypeShelf
          </Link>

          {/* Navigation */}
          <nav
            className="flex items-center gap-4 md:gap-6"
            aria-label="Main navigation"
          >
            {isLoaded && isSignedIn ? (
              <Link
                href="/recommendations"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
              >
                My Shelf
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 min-h-[44px] min-w-[44px]"
                  aria-label="Sign in"
                >
                  Sign in
                </button>
              </SignInButton>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
