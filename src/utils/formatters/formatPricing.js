export const formatPricing = (dollarAmnt) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(dollarAmnt);
};
