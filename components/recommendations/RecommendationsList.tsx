"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthenticatedRecommendationCard } from "./AuthenticatedRecommendationCard";
import { GenreFilter } from "./GenreFilter";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { Recommendation } from "@/types";

export function RecommendationsList() {
  const [selectedGenre, setSelectedGenre] = useState("");

  const allRecommendations = useQuery(
    api.recommendations.getAllRecommendations
  );
  const filteredRecommendations = useQuery(
    api.recommendations.getRecommendationsByGenre,
    selectedGenre ? { genre: selectedGenre } : "skip"
  );

  const recommendations = selectedGenre ? filteredRecommendations : allRecommendations;

  if (allRecommendations === undefined) {
    return (
      <div className="py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (allRecommendations.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex flex-col items-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-lg font-medium text-gray-900 mb-2">
            No recommendations yet
          </p>
          <p className="text-gray-600 max-w-md">
            Be the first to add a recommendation! Use the form above to share
            something amazing with the community.
          </p>
        </div>
      </div>
    );
  }

  const isLoadingFilter = Boolean(
    selectedGenre && filteredRecommendations === undefined
  );
  const displayRecommendations = recommendations ?? [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedGenre
            ? `${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} (${displayRecommendations.length})`
            : `All Recommendations (${displayRecommendations.length})`}
        </h2>
        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          disabled={isLoadingFilter}
        />
      </div>

      {isLoadingFilter ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : displayRecommendations.length === 0 ? (
        <div className="py-12 text-center">
          <div className="inline-flex flex-col items-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-lg font-medium text-gray-900 mb-2">
              No recommendations in this genre
            </p>
            <p className="text-gray-600 max-w-md">
              Try selecting a different genre or add the first recommendation in
              this category!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRecommendations.map((recommendation: Recommendation) => (
            <AuthenticatedRecommendationCard
              key={recommendation._id}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
