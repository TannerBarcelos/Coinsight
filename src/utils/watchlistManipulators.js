// Remove a coin from watchlist
export const removeFromWatchlist = (e, id, setWatchList) => {
  const currentWatchlist = JSON.parse(localStorage.getItem('watchList'));
  const newWatchlist = currentWatchlist.filter((coin) => coin.id !== id);
  setWatchList((oldState) => oldState.filter((coin) => coin.id !== id));
  localStorage.setItem('watchList', JSON.stringify(newWatchlist));
};

export const addToWatchlist = (coin, setWatchList, watchList) => {
  const {
    current_price,
    image,
    market_cap_rank,
    price_change_percentage_24h,
    id,
    symbol,
  } = coin;

  const newWatchlistCoin = {
    current_price,
    image,
    market_cap_rank,
    price_change_percentage_24h,
    id,
    symbol,
  };

  if (watchList.findIndex((item) => item.id === newWatchlistCoin.id) > -1) {
    alert('You cannot add to your watchlist twice');
    return;
  }

  let currentWatchList = JSON.parse(localStorage.getItem('watchList'));
  if (!currentWatchList) {
    setWatchList([newWatchlistCoin]);
    localStorage.setItem('watchList', JSON.stringify([newWatchlistCoin]));
  } else {
    setWatchList([newWatchlistCoin, ...watchList]);
    localStorage.setItem(
      'watchList',
      JSON.stringify([newWatchlistCoin, ...currentWatchList]),
    );
  }
};

export const clearWatchlist = (setWatchList) => {
  setWatchList([]);
  localStorage.setItem('watchList', JSON.stringify([]));
};
