"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function UserNav() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/recommendations"
            className="text-xl font-bold text-gray-900 hover:text-gray-700"
          >
            HypeShelf
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/recommendations"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              My Shelf
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>

            {/* User Profile / Logout */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
