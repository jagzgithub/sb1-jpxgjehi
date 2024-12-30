// Common validation patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-]{10,}$/,
  postcode: /^[A-Z\d]{1,10}$/i,
  // Only letters, spaces, and hyphens
  name: /^[A-Za-z\s-]+$/,
  // Alphanumeric with basic punctuation
  address: /^[A-Za-z0-9\s,.-]+$/
};