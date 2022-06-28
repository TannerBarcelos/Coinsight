import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import {
  removeFromWatchlist,
  clearWatchlist,
} from '../../utils/watchlistManipulators';
import WatchlistItem from './WatchlistItem';

const Watchlist = ({ watchList, setWatchList }) => {
  const history = useHistory();
  return (
    <div className='watchlist'>
      <div className='watchlist-top-container'>
        <h6>My Watchlist</h6>
        {watchList && watchList.length > 0 ? (
          <Button
            className='cta cta-watch-list'
            onClick={() => clearWatchlist(setWatchList)}
          >
            Clear
          </Button>
        ) : null}
      </div>
      {watchList && watchList.length > 0 ? (
        watchList.map((coin) => (
          <WatchlistItem
            coin={coin}
            history={history}
            setWatchList={setWatchList}
            removeFromWatchlist={removeFromWatchlist}
          />
        ))
      ) : (
        <p className='addTW'>Add to your watchlist</p>
      )}
    </div>
  );
};
export default Watchlist;
