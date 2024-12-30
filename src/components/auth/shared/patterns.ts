// Shared validation patterns across auth forms
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-]{10,}$/,
  postcode: /^[A-Z\d]{1,10}$/i,
  name: /^[A-Za-z\s-]+$/,
  address: /^[A-Za-z0-9\s,.-]+$/
};