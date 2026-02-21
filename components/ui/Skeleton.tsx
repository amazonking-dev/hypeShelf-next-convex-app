import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({
  variant = "rectangular",
  className = "",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-pulse bg-gray-200 ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <Skeleton className="h-6 w-3/4 mb-4" variant="text" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16" variant="rectangular" />
        <Skeleton className="h-6 w-20" variant="rectangular" />
      </div>
      <Skeleton className="h-4 w-full mb-2" variant="text" />
      <Skeleton className="h-4 w-full mb-2" variant="text" />
      <Skeleton className="h-4 w-2/3 mb-4" variant="text" />
      <div className="flex justify-between pt-4 border-t border-gray-100">
        <Skeleton className="h-4 w-24" variant="text" />
        <Skeleton className="h-10 w-20" variant="rectangular" />
      </div>
    </div>
  );
}
