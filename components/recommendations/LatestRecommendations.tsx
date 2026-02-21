"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RecommendationCard } from "./RecommendationCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { Recommendation } from "@/types";
import { useEffect, useState } from "react";

interface LatestRecommendationsProps {
  limit?: number;
}

export function LatestRecommendations({ limit = 8 }: LatestRecommendationsProps) {
  const [error, setError] = useState<string | null>(null);

  const recommendations = useQuery(
    api.recommendations.getLatestRecommendations,
    limit ? { limit } : {}
  );

  useEffect(() => {
    if (recommendations === undefined && !error) {
      // Check if Convex URL is configured
      if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
        setError(
          "Convex is not configured. Please set NEXT_PUBLIC_CONVEX_URL in your .env.local file."
        );
      }
    }
  }, [recommendations, error]);

  if (recommendations === undefined) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Latest Recommendations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>
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
