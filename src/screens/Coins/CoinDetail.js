import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Button, Container } from 'reactstrap';

// Component imports
import PaginationBar from '../../PaginationBar';
import LoadingSpinner from '../../LoadingSpinner';

// Helper methods
import { createDatePriceCollection } from '../../helpers/dateConversion';
import {
  slicePathName,
  sliceAndUpperCasePathName,
} from '../../helpers/slicePathName';

// Chart Configs
import { dataObj, optionsObj } from '../../chartConfig/chartConfig';

const CoinDetail = ({ match, location }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [paginatedDayValue, setPaginatedDayValue] = useState(7);

  const [coinPrice, setCoinPrice] = useState(null);
  const [coin, setCoin] = useState('');
  const [coinData, setCoinData] = useState({});

  // Grab the coin name from the url path
  const coinName = slicePathName(location.pathname);

  // Get the prcies of the coin based off pagination selection (initial query is 7 days)
  useEffect(() => {
    fetchCoinPrice();
    fetchCoinData();
  }, [paginatedDayValue]);

  const fetchCoinPrice = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PRICE_ONE}${coinName}${process.env.REACT_APP_PRICE_TWO} `,
      );
      console.log(data);
      setCoinPrice(data[coinName].usd);
    } catch (e) {
      history.push('/');
    }
  };
  const fetchCoinData = async () => {
    setCoin(sliceAndUpperCasePathName(location));
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DATA_ONE}${coinName}${process.env.REACT_APP_DATA_TWO}${paginatedDayValue}${process.env.REACT_APP_DATA_THREE}`,
      );
      setCoinData(data);
      setIsLoading(false);
    } catch (e) {
      history.push('/');
    }
  };

  // Only if the coinData exists should we run our conversions
  const formatCoinData = () =>
    coinData && coinData.prices ? createDatePriceCollection(coinData) : [];

  return (
    <Container className="coin_container">
      {isLoading && <LoadingSpinner />}
      {coin && (
        <div>
          <div className="top-info">
            <h1>{coin}</h1>
            <div className="insight-numbers">
              {coinPrice && <span>Current price: ${coinPrice}</span>}
            </div>
          </div>
          <Link to="/coindetails">
            <Button className="cta">Go Back</Button>
          </Link>
          <p
            style={{
              color: '#fff',
              marginTop: '1rem',
            }}
          >
            Select number of days to look back at price fluctuation
          </p>
          <PaginationBar
            setPagination={setPaginatedDayValue}
            nums={[7, 14, 30, 90, 365]}
            className="pagination-bar-coin-details"
          />
        </div>
      )}

      <div style={{ marginTop: '50px' }}>
        <Line
          data={dataObj(formatCoinData)}
          options={optionsObj(coin, paginatedDayValue)}
        />
      </div>
    </Container>
  );
};

export default CoinDetail;
