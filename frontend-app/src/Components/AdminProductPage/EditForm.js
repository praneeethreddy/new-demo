import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '400px',
  margin: '0 auto',
  marginBottom:'20px',
});

const EditForm = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    console.log("state data ", state);
    const validateNumberString = (input)=> {
        const numberRegex = /^-?\d+(\.\d+)?$/;
        return numberRegex.test(input);
      }
    const [productId,setProductId] = useState(state.productId)
  const [title, setTitle] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [price, setPrice] = useState(state.price);
  const [company, setCompany] = useState(state.company);
  const [quantity, setQuantity] = useState(state.quantity);
  const [image, setImage] = useState(state.imageData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') setTitle(value);
    else if (name === 'description') setDescription(value);
    else if (name === 'price') {
        if(validateNumberString(value))
            setPrice(value)
    }
    else if (name === 'company') setCompany(value);
    else if (name === 'quantity') {setQuantity(value<=0?quantity:value)};
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    const errors = {};
    if (!title.trim()) errors.title = true;
    if (!description.trim()) errors.description = true;
    if (!price.trim()) errors.price = true;
    if (!company.trim()) errors.company = true;
    if (!quantity.trim()) errors.quantity = true;
    if (!image) errors.image = true;

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      alert('Fields should not be empty');
      return;
    }

    // Perform API call or form submission logic here


    const response = await axios.put(`http://localhost:8000/updateProduct/${productId}`, { 
        "quantity":quantity,
        "price":price,
        "description":description
     },{
        headers: {
            'content-type': 'multipart/form-data',
          }
     })
    .then(e => e.data.data);
    console.log("edit form data ",response)
    if(response.success=="true"){
        alert("Product Updated Succesfully")
        navigate("/adminDashboard")
    }


   
  };

  return (
    <Container>
        <div>
        <h3>
Product Details
        </h3>
        </div>
      <TextField
        label="Product Title"
        name="title"
        value={title}
        disabled
        error={errors.title}
        helperText={errors.title ? 'Title is required' : ''}
      />
      <TextField
        label="Product Description"
        name="description"
        value={description}
        onChange={handleInputChange}
        error={errors.description}
        helperText={errors.description ? 'Description is required' : ''}
      />
      <TextField
        label="Product Price"
        name="price"
        value={price}
        
        onChange={handleInputChange}
        error={errors.price}
        helperText={errors.price ? 'Price is required' : ''}
      />
      <TextField
        label="Product Company"
        name="company"
        disabled
        value={company}
        error={errors.company}
        helperText={errors.company ? 'Company is required' : ''}
      />
      <TextField
        label="Product Quantity"
        name="quantity"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        error={errors.quantity}
        helperText={errors.quantity ? 'Quantity is required' : ''}
      />
      
     
        <div style={{border:'1px solid black',width:'200px',margin:'auto'}}>
            <span>Image preview</span>
      {image && <img src={image} alt="Preview" style={{ maxWidth: '100%', marginTop: '16px' }} />}
        {errors.image && <span style={{ color: 'red' }}>Image is required</span>}
        </div>
      

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default EditForm;
