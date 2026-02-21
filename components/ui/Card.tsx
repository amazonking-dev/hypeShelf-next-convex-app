import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered";
}

const variantStyles = {
  default: "bg-white shadow-md border border-gray-200",
  elevated: "bg-white shadow-lg border border-gray-100",
  bordered: "bg-white border-2 border-gray-200",
};

export function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-lg p-6 transition-shadow hover:shadow-lg ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
