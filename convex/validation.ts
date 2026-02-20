/**
 * Input validation and sanitization utilities
 * Provides security-focused validation functions
 */

/**
 * Sanitize string input to prevent XSS attacks
 * Removes potentially dangerous characters and trims whitespace
 */
export function sanitizeString(input: string, maxLength?: number): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Trim whitespace
  let sanitized = input.trim();

  // Remove null bytes and control characters (except newlines and tabs)
  sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "");

  // Enforce max length if provided
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Validate URL format and security
 */
export function validateUrl(urlString: string): { isValid: boolean; error?: string } {
  if (!urlString || typeof urlString !== "string") {
    return { isValid: false, error: "URL is required" };
  }

  const trimmed = urlString.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: "URL cannot be empty" };
  }

  // Check for dangerous protocols
  const dangerousProtocols = ["javascript:", "data:", "vbscript:", "file:"];
  const lowerUrl = trimmed.toLowerCase();
  if (dangerousProtocols.some((protocol) => lowerUrl.startsWith(protocol))) {
    return { isValid: false, error: "Invalid URL protocol" };
  }

  try {
    const url = new URL(trimmed);
    // Only allow http and https protocols
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return { isValid: false, error: "URL must use http:// or https:// protocol" };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: "Invalid URL format" };
  }
}

/**
 * Validate string length
 */
export function validateLength(
  input: string,
  fieldName: string,
  minLength: number,
  maxLength: number
): { isValid: boolean; error?: string } {
  if (!input || typeof input !== "string") {
    return { isValid: false, error: `${fieldName} is required` };
  }

  const trimmed = input.trim();

  if (trimmed.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }

  if (trimmed.length > maxLength) {
    return { isValid: false, error: `${fieldName} must be ${maxLength} characters or less` };
  }

  return { isValid: true };
}

/**
 * Validate genre against allowed list
 */
export function validateGenre(genre: string, allowedGenres: readonly string[]): boolean {
  if (!genre || typeof genre !== "string") {
    return false;
  }
  return allowedGenres.includes(genre.toLowerCase().trim());
}

/**
 * Comprehensive validation for recommendation input
 */
export interface RecommendationInput {
  title: string;
  genre: string;
  link: string;
  blurb: string;
}

export function validateRecommendationInput(
  input: RecommendationInput,
  allowedGenres: readonly string[]
): { isValid: boolean; error?: string; sanitized?: RecommendationInput } {
  // Validate title
  const titleValidation = validateLength(input.title, "Title", 1, 200);
  if (!titleValidation.isValid) {
    return titleValidation;
  }

  // Validate genre
  if (!validateGenre(input.genre, allowedGenres)) {
    return { isValid: false, error: "Invalid genre" };
  }

  // Validate link
  const linkValidation = validateUrl(input.link);
  if (!linkValidation.isValid) {
    return linkValidation;
  }

  // Validate blurb
  const blurbValidation = validateLength(input.blurb, "Blurb", 1, 500);
  if (!blurbValidation.isValid) {
    return blurbValidation;
  }

  // Return sanitized input
  return {
    isValid: true,
    sanitized: {
      title: sanitizeString(input.title, 200),
      genre: sanitizeString(input.genre),
      link: sanitizeString(input.link),
      blurb: sanitizeString(input.blurb, 500),
    },
  };
}
