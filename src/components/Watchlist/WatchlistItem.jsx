const CoinListItem = ({ coin, history, setWatchList, removeFromWatchlist }) => {
  const changeInValue = coin.price_change_percentage_24h < 0;
  return (
    <div
      className={`watchlist-item ${
        changeInValue ? 'negative-change' : 'positive-change'
      }`}
      key={coin.id}
    >
      <div className='watchlist-coin-data'>
        <img src={coin.image} alt={coin.id} />
        <p>
          {coin.id} ({coin.symbol})
        </p>
      </div>
      <p>Current Market Cap Ranking: {coin.market_cap_rank}</p>
      <p>Current Price (usd): ${coin.current_price}</p>
      <p>Price Change % (Last 24 hours): {coin.price_change_percentage_24h}</p>
      <i
        class='fas fa-info-circle'
        onClick={(e) => history.push(`/coin/${coin.id}`)}
        className='fas fa-info-circle more-info'
      ></i>
      <i
        onClick={(e) => removeFromWatchlist(e, coin.id, setWatchList)}
        className='far fa-times-circle remove-coin'
      ></i>
    </div>
  );
};
export default CoinListItem;
