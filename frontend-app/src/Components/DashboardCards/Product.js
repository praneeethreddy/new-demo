import React from 'react'
import { Card,TextContainer,Title,SubCardContainer,ImageContainer ,Quantity,ButtonContainer} from './Styles';
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
    quantity,
    description,
    canReturn

}) {
   const navigate = useNavigate();
    const [bag, setBag] = React.useState(cookies[objId]?parseInt(cookies[objId]):0);
    const bagHandler = (operation) =>{
        if(operation == "+" &(bag+1)>quantity ){
            alert("cannot select more than avalibale limit")
        }else{
       const count = operation == "+" ? (bag+1) : (bag -1)
      
      setBag(count);
      setCookie(objId, count, { path: '/' });
        }
    }
  const checkoutHandler = () =>{
navigate("/cart")
  }
    return(
    
  <Card>
  <SubCardContainer>
    <ImageContainer src={imageData} alt='product-image'/>
  </SubCardContainer>
  <TextContainer>
  
  <Title><b>{title}</b></Title> 
  <span>Description :  {description}</span>
      <span>Suppiler :  {company}</span>
      <span>Price : {price} $</span>
      
      {
        quantity<=0?
        <span style={{color:'red',marginBottom:'20px'}}>OUT OF STOCK</span>:
        <span>Quantity Available * : {quantity} </span>
      }
     {
      quantity<=0?<>
      
      </>:
     
     <>
      <ButtonContainer >
        { bag == 0 ?
      <Button variant="contained" size="medium" onClick={()=>bagHandler("+")}>
            Add To Bag
          </Button>
    :<>
    <Button variant="contained" size="medium" onClick={()=>bagHandler("-")}>
         -
        </Button>
         <Quantity > {bag}</Quantity>
          
        <Button variant="contained" size="medium" onClick={()=>bagHandler("+")}>
            +
          </Button>
        </>
        }
      </ButtonContainer>
      {bag != 0 && <ButtonContainer>
      <Button variant="contained" size="medium" onClick={()=>checkoutHandler()}>
            Go to Cart
          </Button>
      </ButtonContainer>
      }
  </>
}
  </TextContainer>
  
  </Card>
      
      
    );
  
}

export default Product