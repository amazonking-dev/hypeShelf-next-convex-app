import { AddRecommendationForm } from "@/components/recommendations/AddRecommendationForm";
import { RecommendationsList } from "@/components/recommendations/RecommendationsList";

export default function RecommendationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Shelf</h1>
      <p className="text-gray-600 mb-8">
        View and manage your recommendations. Add new ones, filter by genre, or
        explore what others have shared.
      </p>

      {/* Add Recommendation Form */}
      <div className="max-w-xl mb-12">
        <AddRecommendationForm />
      </div>

      {/* Recommendations List */}
      <RecommendationsList />
    </div>
  );
}
