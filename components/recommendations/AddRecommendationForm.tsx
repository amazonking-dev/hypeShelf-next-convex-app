"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { GENRES } from "@/types";
import { useToast } from "@/components/ui/Toast";

const BLURB_MAX_LENGTH = 500;
const TITLE_MAX_LENGTH = 200;

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function AddRecommendationForm() {
  const createRecommendation = useMutation(api.mutations.createRecommendation);
  const { user } = useUser();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [link, setLink] = useState("");
  const [blurb, setBlurb] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setGenre("");
    setLink("");
    setBlurb("");
    setError(null);
  };

  const validateForm = (): string | null => {
    if (!title.trim()) return "Title is required";
    if (title.length > TITLE_MAX_LENGTH)
      return `Title must be ${TITLE_MAX_LENGTH} characters or less`;

    if (!genre) return "Please select a genre";
    if (!GENRES.includes(genre as (typeof GENRES)[number]))
      return "Please select a valid genre";

    if (!link.trim()) return "Link is required";
    if (!isValidUrl(link.trim())) return "Please enter a valid URL";

    if (!blurb.trim()) return "Blurb is required";
    if (blurb.length > BLURB_MAX_LENGTH)
      return `Blurb must be ${BLURB_MAX_LENGTH} characters or less`;

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!user) {
      setError("You must be signed in to add a recommendation");
      return;
    }

    setIsSubmitting(true);

    try {
      const authorName =
        user.fullName || user.primaryEmailAddress?.emailAddress || "Anonymous";

      await createRecommendation({
        title: title.trim(),
        genre: genre.trim(),
        link: link.trim(),
        blurb: blurb.trim(),
        authorName,
      });

      setSuccess(true);
      resetForm();
      toast("Recommendation added successfully!", "success");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to add recommendation";
      setError(msg);
      toast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Add a Recommendation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Inception"
            maxLength={TITLE_MAX_LENGTH}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            disabled={isSubmitting}
          />
          <p className="mt-1 text-xs text-gray-500">
            {title.length}/{TITLE_MAX_LENGTH}
          </p>
        </div>

        {/* Genre */}
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Genre <span className="text-red-500">*</span>
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            disabled={isSubmitting}
          >
            <option value="">Select a genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Link */}
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Link <span className="text-red-500">*</span>
          </label>
          <input
            id="link"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            disabled={isSubmitting}
          />
        </div>

        {/* Blurb */}
        <div>
          <label
            htmlFor="blurb"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Blurb <span className="text-red-500">*</span>
          </label>
          <textarea
            id="blurb"
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            placeholder="A short description of why you recommend this..."
            rows={4}
            maxLength={BLURB_MAX_LENGTH}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            disabled={isSubmitting}
          />
          <p className="mt-1 text-xs text-gray-500">
            {blurb.length}/{BLURB_MAX_LENGTH}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="p-3 text-sm text-green-700 bg-green-50 rounded-lg">
            Recommendation added successfully!
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Adding..." : "Add Recommendation"}
        </button>
      </form>
    </div>
  );
}
