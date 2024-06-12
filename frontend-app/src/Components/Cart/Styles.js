import styled from 'styled-components'
 
const Quantity = styled.span`
width: 24px;
text-align: center;
`
const Item = styled.div`
width: 33%;
margin-bottom:20px;
&:nth-child(odd) {
  order: 1;
}
`
const Title = styled.h3``;
const ButtonContainer = styled.div`
margin-top: 10px;
margin-bottom: 10px;
display: flex;
width: 100%;
justify-content: center;
`;
const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 500px;
border-radius: 5px;
display: flex;
`;

const SubCardContainer = styled.div`
padding:5px;
border:5px solid black;
border-radius:5px;
`

const ImageContainer = styled.img`
width:150px;
height:150px;
border-radius: 5px 5px 0 0;
`;

const TextContainer = styled.div`
display: flex;
    flex-direction: column;
padding: 2px 16px;
`
const MainNav = styled.div`
margin-left: 240px;
position: absolute;
display:flex;
padding-bottom:20px;
`

export {MainNav,TextContainer,Item,ImageContainer,SubCardContainer,Card,ButtonContainer,Title,Quantity}