import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Component imports
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import CoinDetails from './screens/Coins/CoinDetails';
import CoinDetail from './screens/Coins/CoinDetail';
import AuthRoute from './components/authRoute';
import { AuthProvider } from './contexts/authContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <AuthRoute exact path="/coins" component={CoinDetails} />
          <AuthRoute exact path="/coin/:id" component={CoinDetail} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
