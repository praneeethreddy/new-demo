import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '400px',
    margin: '0 auto',
    marginBottom:'20px',
});

const RegistrationForm = () => {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!firstName) {
      newErrors.firstName = true;
    }
    if (!lastName) {
      newErrors.lastName = true;
    }
    if (!email) {
      newErrors.email = true;
    }
    if (!password) {
      newErrors.password = true;
    }
    if (!mobileNumber) {
      newErrors.mobileNumber = true;
    }
    if (!address) {
      newErrors.address = true;
    }
    if (!city) {
      newErrors.city = true;
    }
    if (!state) {
      newErrors.state = true;
    }
    if (!pincode) {
      newErrors.pincode = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Please fill in all fields');
      return;
    }
    const  addressObj =  { 
        address_one:address, 
        city:city, 
        country:"USA", 
        pin:pincode, 
        state:state } ;

        const personal = { 
            first_name:firstName, 
            last_name:lastName, 
            mail:email, 
            pass:password, 
            phone:mobileNumber, 
            address :addressObj
        } ;

    const response = await axios.post('http://localhost:8000/registerCustomer', { ...personal })
    .then( e => e.data.data);
    console.log("response  : ",response.msg);
        if(response.msg == "success"){
            alert("Registration done")
            navigate('/');
        }
    // Make API call to submit the data to the backend
    // Your API call logic goes here

    // Reset form fields after submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setMobileNumber('');
    setAddress('');
    setCity('');
    setState('');
    setPincode('');
    setErrors({});
  };

  return (
    <Container>
        <h3>Customer Registeration</h3>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
              fullWidth
            />
          </Grid>
        </Grid>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          type="password"
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="Mobile Number"
          value={mobileNumber}
          onChange={(e) => { setMobileNumber((e.target.value).length<=10?(e.target.value):mobileNumber)}}
          error={errors.mobileNumber}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={errors.address}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={errors.city}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          error={errors.state}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          error={errors.pincode}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <Button style={{marginTop:'10px'}} variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default RegistrationForm;
