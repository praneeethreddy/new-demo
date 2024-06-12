import * as React from 'react';
import { useSelector ,useDispatch} from 'react-redux'
import { Cookies } from 'react-cookie';
import Product from './Product';
import { Item } from './Styles';
import { MainNav } from './Styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from "styled-components"
import { getProducts } from '../../redux/actions/productActions';
import { ButtonContainer } from '../DashboardCards/Styles';


export default function Cart() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartHandler = () =>{
    navigate("/checkout");
  }
  const goBack = () =>{
    navigate("/dashboard");
  }
    React.useEffect(()=>{
      dispatch(getProducts());
      },[dispatch]);
  const stateData = useSelector((state) => state.products.data);

  const cookies = new Cookies();
  const[NoCookies,setNoCookies] = React.useState(Object.keys(cookies.getAll()).length)
  console.log("noofcookies",NoCookies)
  return (
    <>
    <MainNav>
      <div style={{ display: 'flex', flexWrap: 'wrap',flexDirection:'column' }}>
        {stateData &&
          stateData.map((obj, index) =>
          cookies.get(obj._id) && parseInt(cookies.get(obj._id))!=0?
            <Item key={index} >
              <Product 
              count={parseInt(cookies.get(obj._id))} 
              cookies={cookies} 
              imageData={obj.image} 
              key={index} objId={obj._id} 
              setNoCookies={setNoCookies} 
              NoCookies={NoCookies}
              company={obj.company} 
              title={obj.title}
              description={obj.description}
              price={obj.price}
              />
            </Item>:
            <></>
          )
        }
        {
          NoCookies>2?<></>:
          <Card>
<Title>

  NO ITEMS IN CART
</Title>

            </Card>
        }
       
      </div>
       

      { NoCookies>2?
        <>
        <div style={{marginLeft:'30px'}}>
        
        <ButtonContainer>
        <Button variant="contained" size="medium" onClick={()=>cartHandler()} >
            Proceed to Checkout
          </Button>
        </ButtonContainer>
        </div>
        </>:<div style={{marginLeft:'30px'}}>
        
        <ButtonContainer>
        <Button variant="contained" size="medium" onClick={()=>goBack()} >
           Go To  Dashboard
          </Button>
        </ButtonContainer>
        </div>
}
      </MainNav>
    </>
  );
}

const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width:500px;
height:500px;
border-radius: 5px;
padding:10px;
`;
const Title = styled.h3`
text-align:center;
margin-top:45%;
`;