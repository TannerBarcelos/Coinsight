import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

const Login = () => {
  const [fullName, setFullName] = useState('');
  const [emailInp, setEmailInp] = useState('');
  const [pwdInp, setPwdInp] = useState('');

  // Process Login
  const onSubmit = (e) => {
    console.log(emailInp, pwdInp, fullName);
  };

  return (
    <Container
      style={{
        height: '30rem',
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
          <Label for="nameInput">Full Name</Label>
          <Input
            type="text"
            name="name"
            id="nameInput"
            onChange={(e) => setFullName(e.target.value)}
          />
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
        <Button onClick={onSubmit}>Login</Button>
      </Form>
      <p style={{ display: 'inline-block', marginTop: '1rem' }}>
        Already a member? Sign in <Link to="/login">here</Link>
      </p>
      <Link
        to="/"
        style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}
      >
        <Button>
          <i class="fas fa-home"></i>
        </Button>
      </Link>
    </Container>
  );
};

export default Login;
