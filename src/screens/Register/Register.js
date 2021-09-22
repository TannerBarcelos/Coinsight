import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

import { useAuth } from '../../contexts/authContext';

const Login = () => {
  const history = useHistory();

  const [emailInp, setEmailInp] = useState('');
  const [pwdInp, setPwdInp] = useState('');
  const [showingPopup, setShowingPopup] = useState(false);

  // signUp and signIn actions are available to us since they are functions - the variables will take some time to populate
  const { currentUser, isAuth, signUp } = useAuth();

  // Process Registration
  const onSubmit = async (e) => {
    await signUp(emailInp, pwdInp);
    if (isAuth) {
      setShowingPopup(true);
      setTimeout(() => {
        setShowingPopup(false);
        history.push('/coins');
      }, 3000);
    }
  };

  return (
    <Container
      style={{
        height: '23rem',
        width: '40rem',
        margin: '10rem auto',
        background: '#165ba51a',
        borderRadius: '5px',
        padding: '1rem',
        position: 'relative',
      }}
    >
      <h1>Sign Up</h1>
      <Form>
        <FormGroup>
          <Label for="emailInput">Email</Label>
          <Input
            type="email"
            name="email"
            id="emailInput"
            onChange={(e) => setEmailInp(e.target.value)}
          />
          <Label for="passwordInput">Password</Label>
          <Input
            type="password"
            name="password"
            id="passwordInput"
            onChange={(e) => setPwdInp(e.target.value)}
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
