import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="home_container">
      <h1>Welcome to CoinSight</h1>
      <p>Get Crypto Curreny Information With Ease</p>
      <Link to={currentUser ? '/coins' : '/login'} className="start-btn">
        {currentUser ? 'Get Your Coinsights' : 'Login'}
      </Link>
    </div>
  );
};

export default Home;
