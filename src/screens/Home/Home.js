import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
const Home = () => {
  const { isAuth } = useAuth();
  return (
    <div className="home_container">
      <h1>Welcome to CoinSight</h1>
      <p>Get Crypto Curreny Information With Ease</p>
      <Link to={isAuth ? '/coins' : '/login'} className="start-btn">
        {isAuth ? 'Get Coinsights' : 'Login'}
      </Link>
    </div>
  );
};

export default Home;
