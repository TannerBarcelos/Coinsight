import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import axios from 'axios';

import { BsFillBookmarkFill } from 'react-icons/bs';

import { addToWatchlist } from '../../utils/watchlistManipulators';

import { formatPricing } from '../../utils/formatPricing';

import {
  Button,
  Container,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';

// Component imports
import PaginationBar from '../../components/PaginationBar';
import LoadingSpinner from '../../components/LoadingSpinner';
import Watchlist from '../../components/Watchlist/Watchlist';

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

  const { logOut } = useAuth();

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
  const [trendingCoins, setTrendingCoins] = useState([]);
  useEffect(() => {
    const getTrendingCoins = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_TRENDING}`);
        setTrendingCoins([...data]);
        console.log(trendingCoins);
      } catch (error) {
        console.log(error);
      }
    };
    const fetch = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_COINDETAILS_URL_ONE}${paginatedValue}${process.env.REACT_APP_COINDETAILS_URL_TWO}`,
      );
      setCoins(data);
      console.log(coins);
      setIsLoading(false);
    };
    getTrendingCoins();
    fetch();
  }, [paginatedValue]);

  const paginate = (val) => setPaginatedValue(val);

  const logout = async () => {
    try {
      await logOut();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container className='coins_container'>
        <Watchlist watchList={watchList} setWatchList={setWatchList} />
        {isLoading && <LoadingSpinner />}
        <h1>All Coins</h1>
        <i
          className='fas fa-sign-out-alt logout-btn'
          onClick={logout}
          title='Logout'
        ></i>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div></div>
          <div>
            <InputGroup>
              <InputGroupAddon addonType='append'>
                <Input
                  onChange={handleInputChange}
                  name='crypto'
                  placeholder='Enter Any Crypto'
                  className='coin-inp'
                />
                <Button
                  className='cta-search'
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
          className='pagination-bar'
        />
        <Table style={{ marginTop: '4rem' }}>
          <thead>
            <tr>
              <th>Rank (#)</th>
              <th>Symbol</th>
              <th>Coin</th>
              <th>Current Price</th>
              <th>Market Cap ($)</th>
              <th>Add to Watchlist</th>
              <th>Get More Insights</th>
            </tr>
          </thead>
          <tbody>
            {coins &&
              coins.map((coin) => {
                return (
                  <tr key={coin.id}>
                    <td className='coin-market'>
                      <span>{coin.market_cap_rank}</span>
                    </td>
                    <td className='coin-symbol'>
                      <span>{coin.symbol}</span>
                    </td>
                    <td className='coin-dat'>
                      <div>
                        <img src={coin.image} alt={coin.id} />
                        {coin.id}
                      </div>
                    </td>
                    <td className='coin-price'>
                      <span>$ {coin.current_price.toFixed(2)}</span>
                    </td>
                    <td className='coin-market'>
                      <span>{formatPricing(coin.market_cap)}</span>
                    </td>
                    <td>
                      <BsFillBookmarkFill
                        className='cta-watch'
                        onClick={() =>
                          addToWatchlist(coin, setWatchList, watchList)
                        }
                      />
                    </td>
                    <td>
                      <Link to={`/coin/${coin.id}`} className='coin-link'>
                        See more
                      </Link>
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
