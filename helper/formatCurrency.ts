export const formatCurrency = (
  amount: number,
  locale = "en-NG",
  currency = "NGN"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    // maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    // notation: "compact",
  }).format(amount);
};
