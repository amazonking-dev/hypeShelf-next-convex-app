"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Recommendation } from "@/types";
import { RecommendationCard } from "./RecommendationCard";
import { DeleteConfirmDialog } from "@/components/ui/DeleteConfirmDialog";

interface AuthenticatedRecommendationCardProps {
  recommendation: Recommendation;
}

export function AuthenticatedRecommendationCard({
  recommendation,
}: AuthenticatedRecommendationCardProps) {
  const { user } = useUser();
  const deleteRecommendation = useMutation(api.mutations.deleteRecommendation);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUserId = user?.id ?? null;
  const isAdmin = (user?.publicMetadata?.role as string) === "admin";
  const isOwner = currentUserId === recommendation.authorId;
  const canDelete = isOwner || isAdmin;

  const handleDeleteClick = () => {
    setError(null);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteRecommendation({ id: recommendation._id as Id<"recommendations"> });
      setShowDeleteDialog(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete recommendation"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    if (!isDeleting) {
      setShowDeleteDialog(false);
      setError(null);
    }
  };

  return (
    <>
      <div className="relative">
        <RecommendationCard recommendation={recommendation} />
        {canDelete && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete recommendation"
              aria-label="Delete recommendation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Recommendation"
        message={`Are you sure you want to delete "${recommendation.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />

      {error && (
        <div className="mt-2 p-3 text-sm text-red-700 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
    </>
  );
}
