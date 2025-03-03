/**
 * Validates if the given string is a URL
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return false;

  try {
    // Use a more comprehensive pattern for validation
    const pattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?].*)?$/;
    return pattern.test(url);
  } catch (e) {
    return false;
  }
};

/**
 * Normalizes a URL by adding https:// if missing
 */
export const normalizeUrl = (url: string): string => {
  if (!url) return "";

  // Check if URL already has http:// or https://
  if (url.match(/^https?:\/\//)) {
    return url;
  }

  // Add https:// by default
  return `https://${url}`;
};
