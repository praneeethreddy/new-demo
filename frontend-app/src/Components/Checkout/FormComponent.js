import React, { useState , useEffect} from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { Cookies } from 'react-cookie';
import axios from 'axios';

const FormContainer = styled('div')(({ theme }) => ({
  maxWidth: 500,
  padding: theme.spacing(3),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  textAlign: 'center',
}));

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PickupContainer = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.secondary.main}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  marginTop: theme.spacing(2),
}));

const PickupText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 'bold',
}));

const FormComponent = ({setdeliveryType,setdeliveryAddress}) => {

    const cookies = new Cookies();
    const addressId = cookies.get("address")
    const [isLoading, setIsLoading] = useState(true);

    const [isEdited,setIsEdited] = useState(false);
    


  const [shippingMethod, setShippingMethod] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const[timeShipping,setTimeShipping]=useState("10");
  const handleTimeShippingMethodChange = (event) =>{
    setTimeShipping(event.target.value)
  }

    useEffect(  () => {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/address/${addressId}` )
        .then( e => e.data.data);
        
        setAddress(response.address_one);
        setCity(response.city);
        setState(response.state);
        setPincode(response.pin);
        setIsLoading(false)
        }
        fetchData();
    }, [])
    
    const updateAddress = async () =>{
        const response = await axios.put(`http://localhost:8000/updateAddress/${addressId}`,{
            address_one:address, 
            city:city,
            pin:pincode,
            state:state
        } )
        .then( e => e.data.data);
         }

  const handleShippingMethodChange = (event) => {
    setShippingMethod(event.target.value);
    setdeliveryType(event.target.value);
    if(event.target.value=="pickup"){
    setdeliveryAddress("6490ed82b7e7f881401855d0");
    }else{
        setdeliveryAddress(addressId);
    }
  };

  const handleDoneClick = () => {
    if (validateForm()) {
        if(isEdited){
            updateAddress();
        }
      setReadOnly(true);
    } else {
      alert('Please fill in all the required fields.');
    }
  };

  const handleEditClick = () => {
    setReadOnly(false);
  };

  const validateForm = () => {
    const errors = {};

    if (shippingMethod === 'delivery') {
      if (address.trim() === '') {
        errors.address = true;
      }
      if (city.trim() === '') {
        errors.city = true;
      }
      if (state.trim() === '') {
        errors.state = true;
      }
      if (pincode.trim() === '') {
        errors.pincode = true;
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <FormContainer>
      <Title variant="h6">Shipping Details</Title>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="shipping-method-label">Shipping Method</InputLabel>
            <Select
              labelId="shipping-method-label"
              id="shipping-method"
              value={shippingMethod}
              onChange={handleShippingMethodChange}
            >
              <MenuItem value="delivery">Delivery</MenuItem>
              <MenuItem value="pickup">Store Pickup</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {shippingMethod === 'delivery'  && !isLoading ? (
          <>
            <Grid item xs={12}>
              <InputField
                id="address"
                label="Address"
                fullWidth
                maxLength={30}
                variant="outlined"
                disabled={readOnly}
                error={validationErrors.address}
                value={address}
                onChange={(e) => { setIsEdited(true);setAddress(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                id="city"
                label="City"
                fullWidth
                variant="outlined"
                disabled={readOnly}
                error={validationErrors.city}
                value={city}
                onChange={(e) =>{ setIsEdited(true);setCity(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                id="state"
                label="State"
                fullWidth
                variant="outlined"
                disabled={readOnly}
                error={validationErrors.state}
                value={state}
                onChange={(e) => {setIsEdited(true);setState(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                id="pincode"
                label="Pincode"
                fullWidth
                variant="outlined"
                disabled={readOnly}
                error={validationErrors.pincode}
                value={pincode}
                onChange={(e) => {setIsEdited(true);setPincode(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                id="country"
                label="Country"
                fullWidth
                variant="outlined"
                disabled
                value="USA"
              />
            </Grid>
            <Grid item xs={12}>
              {readOnly ? (
                <Box textAlign="center">
                  <Button variant="contained" color="primary" onClick={handleEditClick}>
                    Edit
                  </Button>
                </Box>
              ) : (
                <Box textAlign="center">
                  <Button variant="contained" color="primary" onClick={handleDoneClick}>
                    Done
                  </Button>
                </Box>
              )}
            </Grid>
          </>
        ) : (
          <>
          <Grid item xs={12}>
            <PickupContainer>
              <PickupText>Pickup Location: "Target 125 street, Overland park, Kansas City, 66213"</PickupText>
              <PickupText>Pickup Time: "10:00 AM" To "6:00PM"</PickupText>
            </PickupContainer>
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="shipping-method-label">Shipping Method</InputLabel>
            <Select
              labelId="shipping-method-label"
              id="shipping-method"
              value={timeShipping}
              onChange={handleTimeShippingMethodChange}
            >
             { [10,11,12,11,1,2,3,4,5,6].map((obj,index) => (
              <MenuItem key={index+"-"+obj} value={obj}>{obj}:00{index>=2?"PM":"AM"}</MenuItem>
             ))

              }
              
              
            </Select>
          </FormControl>
        </Grid>
          </>
        )}
      </Grid>
    </FormContainer>
  );
};

export default FormComponent;
