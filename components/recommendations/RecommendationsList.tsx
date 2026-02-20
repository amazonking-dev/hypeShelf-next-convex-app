"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RecommendationCard } from "./RecommendationCard";
import { Recommendation } from "@/types";

export function RecommendationsList() {
  const recommendations = useQuery(api.recommendations.getAllRecommendations);

  if (recommendations === undefined) {
    return (
      <div className="py-12">
        <div className="flex items-center justify-center">
          <div className="animate-pulse flex flex-col gap-4 w-full max-w-4xl">
            <div className="h-48 bg-gray-200 rounded-lg" />
            <div className="h-48 bg-gray-200 rounded-lg" />
            <div className="h-48 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
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

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        All Recommendations ({recommendations.length})
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((recommendation: Recommendation) => (
          <RecommendationCard
            key={recommendation._id}
            recommendation={recommendation}
          />
        ))}
      </div>
    </div>
  );
}
