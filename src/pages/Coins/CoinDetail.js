import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Button, Container } from 'reactstrap';
import PaginationBar from '../../components/PaginationBar';
import LoadingSpinner from '../../components/LoadingSpinner';

import {
  convertISOString,
  createDatePriceCollection,
} from '../../utils/dateConversion';

import {
  slicePathName,
  sliceAndUpperCasePathName,
} from '../../utils/slicePathName';

import { dataObj, optionsObj } from '../../chartConfig/chartConfig';

const CoinDetail = ({ match, location }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [paginatedDayValue, setPaginatedDayValue] = useState(7);

  const [coinPrice, setCoinPrice] = useState(null);
  const [coin, setCoin] = useState('');
  const [coinData, setCoinData] = useState({});
  const [coinNews, setCoinNews] = useState([]);

  const coinName = slicePathName(location.pathname);

  useEffect(() => {
    fetchCoinPrice();
    fetchCoinData();
    fetchCoinNews();
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

  const fetchCoinNews = async () => {
    const {
      data: { value },
    } = await axios.get(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=${coinName}&safeSearch=Off&textFormat=Raw&freshness=Day`,
      {
        method: 'GET',
        headers: {
          'x-bingapis-sdk': 'true',
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
        },
      },
    );
    setCoinNews(value);
  };

  const formatCoinData = () =>
    coinData && coinData.prices ? createDatePriceCollection(coinData) : [];

  return (
    <Container className='coin_container'>
      {isLoading && <LoadingSpinner />}
      {coin && (
        <div>
          <div className='top-info'>
            <h1>{coin}</h1>
            <div className='insight-numbers'>
              {coinPrice && <span>Current price: ${coinPrice}</span>}
            </div>
          </div>
          <Link to='/coins'>
            <Button className='cta'>
              <i class='fas fa-arrow-left'></i>
            </Button>
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
            className='pagination-bar-coin-details'
          />
        </div>
      )}

      <div style={{ marginTop: '50px' }}>
        <Line
          data={dataObj(formatCoinData)}
          options={optionsObj(coin, paginatedDayValue)}
        />
      </div>
      {coinNews.length > 0 && (
        <h1 style={{ marginTop: '4rem' }}>Latest {coin} News</h1>
      )}
      <div className='news-card-container'>
        {coinNews &&
          coinNews.map((newsArticle) => {
            const articleName = newsArticle.name;
            const articlePubDate = newsArticle.datePublished;
            const articleLink = newsArticle.url;
            const articleImg =
              newsArticle &&
              newsArticle.image &&
              newsArticle.image.thumbnail &&
              newsArticle.image.thumbnail.contentUrl;
            console.log(articleImg);
            return (
              <div className='news-card'>
                {articleImg && <img src={articleImg} alt='article-image' />}
                <p>{articleName}</p>
                <span>{convertISOString(articlePubDate)}</span>
                <a href={articleLink} target='_blank'>
                  Read More
                </a>
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default CoinDetail;
