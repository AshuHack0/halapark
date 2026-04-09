/**
 * Library utilities and helpers
 */

/**
 * Class name utility (similar to clsx)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate unique ID
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
