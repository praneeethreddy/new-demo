import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
} from '@mui/material';
import { Cookies } from 'react-cookie';
import { styled } from '@mui/system';
import { useNavigate,NavLink } from 'react-router-dom';

const LoginForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SignInButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
}));

const Login = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (email.trim() === '' || password.trim() === '') {
      setError(true);
      setAlertOpen(true);
      return;
    }
  
    try {

      let isValidCredentials = false
      if(email == "admin@gmail.com"){
       
        const response = await axios.post('http://localhost:8000/admin', { email, password })
        .then( e => e.data.data);
        console.log("data from the server : ",response)
        isValidCredentials = response == "error" ? false :true
        if (isValidCredentials) {
          await cookies.set("admin", response._id, { path: '/' });
     
          console.log("hello user log in")
          navigate('/adminDashboard');
        }
      }else{
        const response = await axios.post('http://localhost:8000/customer', { email, password })
      .then( e => e.data.data);

      isValidCredentials = response == "error" ? false :true
        if (isValidCredentials) {
        await cookies.set("customer", response._id, { path: '/' });
          cookies.set("address", response.address, { path: '/' });
         
          navigate('/dashboard');
        }
      }
    
      
       if(!isValidCredentials) {
        setError(true);
        setAlertOpen(true);
  
        // Reset the form after 10 seconds
        setTimeout(() => {
          setError(false);
          setEmail('');
          setPassword('');
          setAlertOpen(false);
        }, 10000);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <LoginForm onSubmit={handleSignIn}>
        <InputField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error && email.trim() === ''}
          fullWidth
          required
        />
        <InputField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error && password.trim() === ''}
          fullWidth
          required
        />
        <div>
        <NavLink
          to="/userRegistration"
     
>
  Register New Customer
</NavLink>;
        </div>
        <SignInButton variant="contained" color="primary" type="submit">
          Sign In
        </SignInButton>
      </LoginForm>
      <Snackbar
        open={alertOpen}
        autoHideDuration={10000}
        onClose={handleAlertClose}
        message="Please enter valid details."
      />
    </Container>
  );
};

export default Login;
