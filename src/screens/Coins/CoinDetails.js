import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { BsFillBookmarkFill } from 'react-icons/bs';

import {
  removeFromWatchlist,
  addToWatchlist,
  clearWatchlist,
} from '../../helpers/watchlistManipulators';

import './Coins.css';

import {
  Button,
  Container,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';

// Component imports
import PaginationBar from '../../PaginationBar';
import LoadingSpinner from '../../LoadingSpinner';

const CoinDetails = () => {
  const watchListFromLocalStorage = JSON.parse(
    localStorage.getItem('watchList'),
  );
  const [coins, setCoins] = useState([]);
  const [watchList, setWatchList] = useState(
    watchListFromLocalStorage ? watchListFromLocalStorage : [],
  );
  const [paginatedValue, setPaginatedValue] = useState(1); // allow pagination
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoName, setCryptoName] = useState({});
  const history = useHistory();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCryptoName({ ...cryptoName, [name]: value.replace(' ', '-') });
  };

  const validateSearch = (term) => {
    if (!term || term.length === 0) {
      alert('Please enter a valid coin');
      return false;
    } else {
      history.push(`/coin/${cryptoName.crypto}`);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_COINDETAILS_URL_ONE}${paginatedValue}${process.env.REACT_APP_COINDETAILS_URL_TWO}`,
      );
      setCoins(data);
      setIsLoading(false);
    };
    fetch();
  }, [paginatedValue]);

  const paginate = (val) => {
    setPaginatedValue(val);
  };

  return (
    <div>
      <Container className="coins_container">
        <div className="watchlist">
          <div className="watchlist-top-container">
            <h6>Watchlist</h6>
            {watchList && watchList.length > 0 ? (
              <Button
                className="cta"
                onClick={() => clearWatchlist(setWatchList)}
              >
                Clear Watchlist
              </Button>
            ) : null}
          </div>
          {watchList && watchList.length > 0 ? (
            watchList.map((coin) => (
              <div className="watchlist-item" key={coin.id}>
                <div className="watchlist-coin-data">
                  <img src={coin.image} alt={coin.id} />
                  <p>
                    {coin.id} ({coin.symbol})
                  </p>
                </div>
                <p>Current Market Cap Ranking: {coin.market_cap_rank}</p>
                <p>Current Price (usd): ${coin.current_price}</p>
                <p>
                  Price Change % (Last 24 hours):{' '}
                  {coin.price_change_percentage_24h}
                </p>
                <i
                  class="fas fa-info-circle"
                  onClick={(e) => history.push(`/coin/${coin.id}`)}
                  className="fas fa-info-circle more-info"
                ></i>
                <i
                  onClick={(e) => removeFromWatchlist(e, coin.id, setWatchList)}
                  className="far fa-times-circle remove-coin"
                ></i>
              </div>
            ))
          ) : (
            <p className="addTW">
              Add to your watchlist to stay on top of price changes
            </p>
          )}
        </div>

        {isLoading && <LoadingSpinner />}
        <h1>Coin Details</h1>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/">
            <Button className="cta cta-home">Go Home</Button>
          </Link>
          <div>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <Input
                  onChange={handleInputChange}
                  name="crypto"
                  placeholder="Enter Any Crypto"
                  className="coin-inp"
                />
                <Button
                  className="cta-search"
                  style={{ marginLeft: '1rem' }}
                  onClick={() => validateSearch(cryptoName.crypto)}
                >
                  Perform Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <PaginationBar
          setPagination={paginate}
          nums={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          className="pagination-bar"
        />
        <Table style={{ marginTop: '4rem' }}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Coin</th>
              <th>Current Price</th>
              <th>Market Cap Rank</th>
              <th>Get More Insights</th>
              <th>Add to Watchlist</th>
            </tr>
          </thead>
          <tbody>
            {coins &&
              coins.map((coin) => {
                return (
                  <tr key={coin.id}>
                    <td className="coin-symbol">
                      <span>{coin.symbol}</span>
                    </td>
                    <td className="coin-dat">
                      <div>
                        <img src={coin.image} alt={coin.id} />
                        {coin.id}
                      </div>
                    </td>
                    <td className="coin-price">
                      <span>$ {coin.current_price.toFixed(2)}</span>
                    </td>
                    <td className="coin-market">
                      <span>{coin.market_cap_rank}</span>
                    </td>
                    <td className="coin-link">
                      <div>
                        <Link to={`/coin/${coin.id}`}>
                          <Button color="primary">See more</Button>
                        </Link>
                      </div>
                    </td>
                    <td>
                      <BsFillBookmarkFill
                        className="cta-watch"
                        onClick={() =>
                          addToWatchlist(coin, setWatchList, watchList)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default CoinDetails;
