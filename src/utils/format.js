export const formatDate = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatNumber = (value) => {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("en-US").format(value);
};
