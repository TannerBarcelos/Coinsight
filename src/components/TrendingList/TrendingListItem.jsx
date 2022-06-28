const TrendingListItem = ({ coin, history }) => {
  return (
    <div className={`trendinglist-item`} key={coin.item.id}>
      <div className='trending-coin-data'>
        <img src={coin.item.thumb} alt={coin.item.id} />
        <p>{coin.item.symbol}</p>
      </div>
      <p>Current Market Cap Ranking: {coin.item.market_cap_rank}</p>
      <p>Price (in btc): {coin.item.price_btc}</p>
      <i
        class='fas fa-info-circle'
        onClick={(e) => history.push(`/coin/${coin.item.id}`)}
        className='fas fa-info-circle more-info-trend'
      ></i>
    </div>
  );
};
export default TrendingListItem;
