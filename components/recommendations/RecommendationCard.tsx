import { Recommendation } from "@/types";
import Link from "next/link";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border ${
        recommendation.isStaffPick
          ? "border-yellow-400 ring-2 ring-yellow-100"
          : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {recommendation.title}
          </h3>
          <div className="flex items-center gap-3">
            <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
              {recommendation.genre}
            </span>
            {recommendation.isStaffPick && (
              <span className="inline-block px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full">
                ⭐ Staff Pick
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Blurb */}
      <p className="text-gray-600 mb-4 line-clamp-3">{recommendation.blurb}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          By <span className="font-medium text-gray-700">{recommendation.authorName}</span>
        </div>
        <Link
          href={recommendation.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors duration-200 min-h-[44px] min-w-[44px]"
          aria-label={`View ${recommendation.title}`}
        >
          View →
        </Link>
      </div>
    </div>
  );
}
