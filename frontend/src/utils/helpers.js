// Format price
export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Capitalize first letter
export const capitalize = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Truncate long text
export const truncate = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

// Calculate cart total
export const calculateCartTotal = (items = []) => {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
