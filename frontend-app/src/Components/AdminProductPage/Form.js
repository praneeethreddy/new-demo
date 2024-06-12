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
});

const Form = () => {
    const navigate = useNavigate();
    const [ age,setAge] = React.useState("");
    const validateNumberString = (input)=> {
        const numberRegex = /^-?\d+(\.\d+)?$/;
        return numberRegex.test(input);
      }
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
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
    else if (name === 'quantity'){setQuantity(value<=0?quantity:value)};
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
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


    const response = await axios.post('http://localhost:8000/addProduct', { 
        "productImage":image,
        "description":description,
        "title":title,
        "quantity":quantity,
        "price":price,
        "company":company,
     },{
        headers: {
            'content-type': 'multipart/form-data',
          }
     })
    .then(e => e.data.data);
    console.log("response data :",response)
    
     if(response.msg=="success"){
        alert("product added succesfully")
        navigate("/adminDashboard")
     }
   
  };

  return (
    <Container>
        <h3>
            Add Product
        </h3>
      <TextField
        label="Product Title"
        name="title"
        value={title}
        onChange={handleInputChange}
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
        value={company}
        onChange={handleInputChange}
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
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        error={errors.image}
        style={{ display: 'none' }}
        id="upload-image"
      />
      <label htmlFor="upload-image">
        <Button component="span" variant="outlined" color="primary">
          Upload Image
        </Button>
        {errors.image && <span style={{ color: 'red' }}>Image is required</span>}
      </label>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default Form;
