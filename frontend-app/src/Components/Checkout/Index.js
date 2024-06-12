import React from 'react'
import { MainNav } from '../Cart/Styles'
import styled from "styled-components"
import FormComponent from './FormComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PaymentForm from './PaymentForm';
import Total from './Total';

import Button from '@mui/material/Button';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Index() {
    const theme = createTheme();
    const navigate = useNavigate();
    const cookies = new Cookies();
    //delivery details
    const [deliveryType, setdeliveryType] = React.useState("pickup");
    const [deliveryAddress, setdeliveryAddress] = React.useState("6490ed82b7e7f881401855d0");

    //payment details
    const [isPaymentDetailsEmpty, setisPaymentDetailsEmpty] = React.useState(true);
    const [paymentType, setpaymentType] = React.useState("Debit");
    const [paymentcardNumber, setpaymentcardNumber] = React.useState("");

    //orders
    const [paymenttotal, setpaymenttotal] = React.useState("");
    const [orderProducts, setorderProducts] = React.useState(null);

    const placeOrder = async () => {
        if (isPaymentDetailsEmpty) {
            alert("please enter card details")
        }
        else {

            const data = {
                customer_id: cookies.get("customer"),
                address_id: cookies.get("address"),
                cancel_done: false,
                cancel_reason: "none",
                cancel_type: "none",
                card_number: paymentcardNumber,
                delivery_status: "Inprogress",
                delivery_type: deliveryType,
                payment_type: paymentType,
                products_details: orderProducts,
                total: paymenttotal,
                canReturn:"Yes",
            }

            const response = await axios.post('http://localhost:8000/placeOrder', { ...data })
                .then(e => e.data.data);
            if (response.msg == "success") {
                alert("order placed succesfully")
                for (let i = 0; i < orderProducts.length; i++) {
                    cookies.remove(orderProducts[i]["id"]);
                }
                navigate("/customerOrders")

            }

        }
    }

    return (
        <MainNav>
            <LeftContainer>
                <AddressBox>
                    <ThemeProvider theme={theme}>
                        <FormComponent
                            setdeliveryType={setdeliveryType}
                            setdeliveryAddress={setdeliveryAddress}
                        />
                    </ThemeProvider>
                </AddressBox>
                <PaymentBox>
                    <PaymentForm
                        setisPaymentDetailsEmpty={setisPaymentDetailsEmpty}
                        setpaymentType={setpaymentType}
                        setpaymentcardNumber={setpaymentcardNumber}
                    />
                </PaymentBox>
            </LeftContainer>
            <RightContainer>
                <Total
                    setpaymenttotal={setpaymenttotal}
                    setorderProducts={setorderProducts}
                />
                <ButtonContainer>
                    <Button variant="contained" size="medium" onClick={() => placeOrder()} >
                        Place Order
                    </Button>
                </ButtonContainer>
            </RightContainer>

        </MainNav>
    )
}

const LeftContainer = styled.div`
width:600px;
height:500px;
margin-right:10px;
margin-left:10px;
`;

const AddressBox = styled.div`
width:auto;
height:auto;
margin:10px;
padding:10px;
`;

const ButtonContainer = styled.div`
margin-top: 10px;
margin-bottom: 10px;
display: flex;
width: 100%;
justify-content: center;
`;
const PaymentBox = styled.div`
width:auto;
height:200px;
margin:10px;
`;
const RightContainer = styled.div`
width:300px;
height:500px;
margin-left:10px;
margin-right:10px;
`;


export default Index