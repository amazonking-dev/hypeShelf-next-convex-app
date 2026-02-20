"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RecommendationCard } from "./RecommendationCard";
import { Recommendation } from "@/types";

interface LatestRecommendationsProps {
  limit?: number;
}

export function LatestRecommendations({ limit = 8 }: LatestRecommendationsProps) {
  // Note: Convex API types will be generated when npx convex dev is run
  // Using type assertion until types are available
  const recommendations = useQuery(
    (api as any).recommendations?.getLatestRecommendations,
    limit ? { limit } : {}
  ) as Recommendation[] | undefined;

  if (recommendations === undefined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">Loading recommendations...</div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg mb-2">No recommendations yet.</p>
          <p className="text-sm">Be the first to share something amazing!</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Latest Recommendations
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation: Recommendation) => (
            <RecommendationCard key={recommendation._id} recommendation={recommendation} />
          ))}
        </div>
      </div>
    </section>
  );
}
