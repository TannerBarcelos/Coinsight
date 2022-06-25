export const convertISOString = (timeSince) => {
  const realDateString = new Date(timeSince);
  const stringDate = realDateString.toDateString();
  return stringDate;
};

export const createDatePriceCollection = (coinData) => {
  const data = coinData.prices.map((coin) => {
    const currentISODate = coin[0];
    const currentPriceAtISO = coin[1].toFixed(2);
    const date = convertISOString(currentISODate);
    return {
      date,
      price: currentPriceAtISO,
    };
  });
  return data.splice(1);
};
