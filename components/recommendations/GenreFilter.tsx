"use client";

import { GENRES } from "@/types";

interface GenreFilterProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  disabled?: boolean;
}

export function GenreFilter({
  selectedGenre,
  onGenreChange,
  disabled = false,
}: GenreFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="genre-filter"
        className="text-sm font-medium text-gray-700 whitespace-nowrap"
      >
        Filter by genre:
      </label>
      <select
        id="genre-filter"
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        disabled={disabled}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">All</option>
        {GENRES.map((genre) => (
          <option key={genre} value={genre}>
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
