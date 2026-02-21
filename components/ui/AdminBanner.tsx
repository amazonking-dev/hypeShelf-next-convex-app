"use client";

import { useUser } from "@clerk/nextjs";

export function AdminBanner() {
  const { user } = useUser();
  const isAdmin = (user?.publicMetadata?.role as string) === "admin";

  if (!isAdmin) return null;

  return (
    <div
      className="mb-8 p-4 rounded-lg bg-amber-50 border border-amber-200"
      role="status"
      aria-label="Admin mode active"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100"
          aria-hidden
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-amber-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <div>
          <h3 className="text-sm font-semibold text-amber-900">Admin Mode</h3>
          <p className="mt-1 text-sm text-amber-800">
            You can delete any recommendation and mark items as Staff Picks. Use
            the star and trash icons on each card.
          </p>
        </div>
      </div>
    </div>
  );
}
