import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home_container">
      <h1>Welcome to CoinSight</h1>
      <p>Get Crypto Curreny Information With Ease</p>
      <Link to="/login" className="start-btn">
        Login
      </Link>
    </div>
  );
};

export default Home;
