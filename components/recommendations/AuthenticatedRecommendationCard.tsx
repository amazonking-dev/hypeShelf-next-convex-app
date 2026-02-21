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
  const toggleStaffPick = useMutation(api.mutations.toggleStaffPick);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingStaffPick, setIsTogglingStaffPick] = useState(false);
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

  const handleToggleStaffPick = async () => {
    setIsTogglingStaffPick(true);
    setError(null);

    try {
      await toggleStaffPick({ id: recommendation._id as Id<"recommendations"> });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update staff pick status"
      );
    } finally {
      setIsTogglingStaffPick(false);
    }
  };

  return (
    <>
      <div className="relative">
        <RecommendationCard recommendation={recommendation} />
        <div className="absolute top-4 right-4 flex items-center gap-1">
          {isAdmin && (
            <button
              type="button"
              onClick={handleToggleStaffPick}
              disabled={isTogglingStaffPick}
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                recommendation.isStaffPick
                  ? "text-yellow-500 hover:bg-yellow-50"
                  : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
              }`}
              title={
                recommendation.isStaffPick
                  ? "Remove Staff Pick"
                  : "Mark as Staff Pick"
              }
              aria-label={
                recommendation.isStaffPick
                  ? "Remove Staff Pick"
                  : "Mark as Staff Pick"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill={recommendation.isStaffPick ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          )}
          {canDelete && (
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
          )}
        </div>
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
