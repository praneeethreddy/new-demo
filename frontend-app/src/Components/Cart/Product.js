import React from 'react'
import { Card,TextContainer,Title,SubCardContainer,ImageContainer ,Quantity,ButtonContainer} from './Styles';

import Button from '@mui/material/Button';

function Product({
  imageData,
  objId,
  count,
  cookies,
  setNoCookies,
  NoCookies,
  company,
  title,
  description,
  price
}) {
  //  console.log(cookies.get(objId))
    const [bag, setBag] = React.useState(count);
    const bagHandler = (operation) =>{
        
      const count = operation == "+" ? (bag+1) : (bag -1)
      
      setBag(count);
      if(count == 0){
        cookies.remove(objId);
        setNoCookies(NoCookies-1);
      }else{
        cookies.set(objId, count, { path: '/' });
      }
      
    }
  
    return(
      bag != 0?
  <Card>
  <SubCardContainer>
    <ImageContainer src={imageData} alt='product-image'/>
  </SubCardContainer>
  <TextContainer>
  
  <Title><b>{title}</b></Title> 
  <span>Description :  <b>{description}</b></span>
      <span>Brand :  <b>{company}</b></span>
      <span>Price : <b>{price} $</b></span>
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
      
  </TextContainer>
  
  </Card>
      :<>EMPTY DATA </>
      
    );
  
}

export default Product