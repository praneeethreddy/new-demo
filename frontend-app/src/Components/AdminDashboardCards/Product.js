import React from 'react'
import { Card, TextContainer, Title, SubCardContainer, ImageContainer, Quantity, ButtonContainer } from './Styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Product({
  imageData,
  objId,
  setCookie,
  cookies,
  price,
  company,
  title,
  description,
  quantity,
  canReturn

}) {
  const navigate = useNavigate();
console.log(" product id : ",objId)
  const editHandler = () => {
    navigate(
      '/adminEditProduct',
      {
        state: {
          imageData,
          price,
          company,
          title,
          description,
          quantity,
          productId:objId,
          canReturn:canReturn
      }} );
  }
  
  return (

    <Card>
      <SubCardContainer>
        <ImageContainer src={imageData} alt='productImage' />
      </SubCardContainer>
      <TextContainer>

        <Title><b>{title}</b></Title>
        
        <span>Description :  {description}</span>
        <span>Company :  {company}</span>
        <span>Price : {price} $</span>
      
        {
        quantity<=0?
        <span style={{color:'red',marginBottom:'20px'}}>OUT OF STOCK</span>:
        <span>Quantity Available * : {quantity} </span>
      }
        <ButtonContainer >

          <Button variant="contained" size="medium" onClick={() => editHandler()}>
            Edit
          </Button>

        </ButtonContainer>

      </TextContainer>

    </Card>


  );

}

export default Product