import React from 'react';
import { useHistory } from 'react-router-dom';
import TrendingListItem from './TrendingListItem';

const TrendingList = ({ trendingList }) => {
  const history = useHistory();
  return (
    <div className='trending-list'>
      <div className='trendinglist-top-container'>
        <h6>Trending Coins</h6>
      </div>
      {trendingList && trendingList.length > 0
        ? trendingList.map((coin) => (
            <TrendingListItem coin={coin} history={history} />
          ))
        : null}
    </div>
  );
};
export default TrendingList;
