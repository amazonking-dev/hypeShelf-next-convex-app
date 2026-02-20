"use client";

import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";

export function PublicNav() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-gray-700"
          >
            HypeShelf
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {isLoaded && isSignedIn ? (
              <Link
                href="/recommendations"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                My Shelf
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
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
