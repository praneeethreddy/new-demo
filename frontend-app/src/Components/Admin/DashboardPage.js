import React from 'react'
import styled from 'styled-components'
import RecipeReviewCard from '../DashboardCards/Index'
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../../redux/actions/productActions';


const MainNav = styled.div`
margin-left: 240px;
position: absolute;
`

function DashboardPage() {
  const dispatch = useDispatch();
  
  React.useEffect(()=>{
    dispatch(getProducts());
    },[dispatch]);

  return (
<MainNav>
    <h1>
        Dashboard
    </h1>

    <RecipeReviewCard />
   
</MainNav>
  )
}

export default DashboardPage