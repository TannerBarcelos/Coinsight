import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useAuth } from '../../contexts/authContext';
import { Alert } from 'reactstrap';

const Login = () => {
  const history = useHistory();

  const [emailInp, setEmailInp] = useState('');
  const [pwdInp, setPwdInp] = useState('');
  const [showingPopup, setShowingPopup] = useState(false);
  const [popupState, setPopupState] = useState({
    success: false,
    color: '',
  });

  // signUp and signIn actions are available to us since they are functions - the variables will take some time to populate
  const { signUp } = useAuth();

  // Process Registration
  const onSubmit = async (e) => {
    try {
      await signUp(emailInp, pwdInp);
      setPopupState({
        success: true,
        color: 'success',
      });
      setShowingPopup(true);
      setTimeout(() => {
        setShowingPopup(false);
        history.push('/coins');
      }, 3000);
    } catch (error) {
      setPopupState({
        success: false,
        color: 'danger',
      });
      setShowingPopup(true);
      setTimeout(() => {
        setShowingPopup(false);
      }, 3000);
    }
  };

  return (
    <Container
      style={{
        height: '26rem',
        width: '40rem',
        margin: '10rem auto',
        background: '#165ba51a',
        borderRadius: '5px',
        padding: '1rem',
        position: 'relative',
      }}
    >
      <h1>Sign Up</h1>
      {showingPopup && (
        <Alert color={popupState.color}>
          {popupState.success
            ? 'Successfully logged in!'
            : 'There was a problem signing in'}
        </Alert>
      )}
      <Form>
        <FormGroup>
          <Label for="emailInput">Email</Label>
          <Input
            type="email"
            name="email"
            id="emailInput"
            onChange={(e) => setEmailInp(e.target.value)}
            className="coin-inp"
          />
          <Label for="passwordInput">Password</Label>
          <Input
            type="password"
            name="password"
            id="passwordInput"
            onChange={(e) => setPwdInp(e.target.value)}
            className="coin-inp"
          />
        </FormGroup>
        <Button onClick={onSubmit}>Register</Button>
      </Form>
      <p style={{ display: 'inline-block', marginTop: '1rem' }}>
        Already a member? Sign in <Link to="/login">here</Link>
      </p>
      <Link
        to="/"
        style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}
      >
        <Button>
          <i className="fas fa-home"></i>
        </Button>
      </Link>
    </Container>
  );
};

export default Login;
