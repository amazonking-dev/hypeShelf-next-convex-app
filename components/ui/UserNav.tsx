"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export function UserNav() {
  const { user } = useUser();
  const isAdmin = (user?.publicMetadata?.role as string) === "admin";

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

            {/* Admin Badge */}
            {isAdmin && (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                title="You have admin privileges"
              >
                Admin
              </span>
            )}

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
