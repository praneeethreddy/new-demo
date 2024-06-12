import React, { useEffcet } from 'react'
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import { Cookies } from 'react-cookie';
import { getProducts } from '../../redux/actions/productActions';

function Total({ setpaymenttotal, setorderProducts }) {

    const multiplyFun = (a, b) => {
        const total = parseFloat(((a * b).toFixed(2)));
        return total
    };

    const dispatch = useDispatch();
    const cookies = new Cookies();

    const stateData = useSelector((state) => state.products.data);
    const [totalCost, setTotalCost] = React.useState(0);

    React.useEffect(() => {
        dispatch(getProducts());

    }, [dispatch]);

    React.useEffect(() => {
        let sumvalue = stateData.map((obj, index) =>
        cookies.get(obj._id) && parseInt(cookies.get(obj._id)) != 0 ?
            (multiplyFun(parseInt(cookies.get(obj._id)), parseFloat(obj.price))) : 0
                ).reduce((acc, curr) => acc + curr, 0);
                
            // console.log("sum value : ",multiplyFun(sumvalue, 0.085))
            setTotalCost(sumvalue + multiplyFun(sumvalue, 0.085))
        
        setorderProducts(stateData.map((obj, index) => {
            if (cookies.get(obj._id) && parseInt(cookies.get(obj._id)) != 0) {
                return {
                    "id": obj._id,
                    "qty": cookies.get(obj._id),
                    "price": obj.price,
                    "title": obj.title,
                    "available":obj.quantity
                }
            }
        }).filter(obj => obj != undefined)
        );
         sumvalue = stateData.map((obj, index) =>
        cookies.get(obj._id) && parseInt(cookies.get(obj._id)) != 0 ?
            (multiplyFun(parseInt(cookies.get(obj._id)), parseFloat(obj.price))) : 0
                ).reduce((acc, curr) => acc + curr, 0);

            // console.log("sum value : ",multiplyFun(sumvalue, 0.085))

        setpaymenttotal(sumvalue + multiplyFun(sumvalue, 0.085));

    }, []);



    return (
        <Card>
            <Title >
                TOTAL
            </Title>


            {
                stateData &&
                stateData.map((obj, index) =>
                    cookies.get(obj._id) && parseInt(cookies.get(obj._id)) != 0 ?
                        <>
                            <ItemContainer>
                                <Items> <span><b>Item</b></span> <span> {obj.title}</span></Items>
                                <Items> <span><b>Qty</b></span> <span> {parseInt(cookies.get(obj._id))}</span></Items>
                                <Items> <span><b>Price</b></span> <span>  {obj.price} $ </span></Items>
                                <Items> <span><b>Total</b></span> <span> {multiplyFun(parseInt(cookies.get(obj._id)), parseFloat(obj.price))} </span></Items>
                            </ItemContainer>
                            <span>----------------------------------</span>


                        </>
                        : <></>
                )
            }

            <ItemContainer>
                <Items> <span><b>Tax </b></span> <span> .85%</span></Items>
                <Items><span><b>Overal Total :  </b></span> <span> {totalCost} $ </span></Items>
            </ItemContainer>
        </Card>
    )
}

const Items = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 220px;
`;

const ItemContainer = styled.div`
margin-left:10px;
`
const Title = styled.h3`
text-align:center;
`;

const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 250px;
border-radius: 5px;
padding:10px;
`;


export default Total