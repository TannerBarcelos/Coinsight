import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Component imports
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CoinDetails from './pages/Coins/CoinDetails';
import CoinDetail from './pages/Coins/CoinDetail';
import SwitchToDT from './pages/DT/SwitchToDT';

import AuthRoute from './components/authRoute';
import { AuthProvider } from './contexts/authContext';

const App = () => {
  // Detect if not on desktop
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    return <SwitchToDT />;
  } else
    return (
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <AuthRoute exact path='/coins' component={CoinDetails} />
            <AuthRoute exact path='/coin/:id' component={CoinDetail} />
          </Switch>
        </Router>
      </AuthProvider>
    );
};

export default App;
