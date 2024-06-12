import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MainNav } from './Styles'
import styled from "styled-components"
import SingleOrderTable from './SingleOrderTable';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';



function ShowOrderPage() {
    const { state } = useLocation();
    const navigate = useNavigate()
    console.log("state data ", state)
    const goBack = () => {
        navigate('/customerOrders')
    }
    const cancelOrder = async () => {

        const data = {
            cancel_done: false,
            cancel_reason: age,
            cancel_type: "Refund Done",
            delivery_status: "PCancelled",
        }

        const response = await axios.put(`http://localhost:8000/cancelOrder/${state._id}`, { ...data })
            .then(e => e.data.data);
        if (response.msg == "success") {
            navigate("/customerOrders")
        }

    }
    const [age, setAge] = React.useState('Other');
    const [deliveryCancelReasonsAfter, setdeliveryCancelReasonsAfter] = React.useState(["Delayed Delivery", "Damaged Item", "Other"])
    const [deliveryCancelReasonsBefore, setdeliveryCancelReasonsBefore] = React.useState(["Found Better Deal", "Incorrect Items", "Not Needed Anymore", "Other"])


    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <MainNav>
            <LeftContainer>
                <Card>
                    <Title >
                        Order Details
                    </Title>
                    <SingleOrderTable orderDetails={state} />
                    <ButtonContainer>
                        <Button variant="contained" size="medium" onClick={() => goBack()} >
                            OK
                        </Button>
                    </ButtonContainer>
                </Card>
            </LeftContainer>
            <RightContainer>

                {



                    !state.cancel_done ?
                        <>
                            <Card>
                                <Title >
                                    Cancel Order
                                </Title>
                                {
state.delivery_status == "PCancelled" ? <>
    <span>
        Cancellation In Progress 
    </span> 
</> 
: state.canReturn == "No"?<>
 <span>
       Item Cannot be Cancelled
    </span> 
</>:

                                <>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Cancel Reason</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            {
                                                state.delivery_status == "Inprogress" ?
                                                    deliveryCancelReasonsBefore.map((obj, index) => (
                                                        <MenuItem key={index} value={obj}>{obj}</MenuItem>
                                                    )) :
                                                    deliveryCancelReasonsAfter.map((obj, index) => (
                                                        <MenuItem key={index} value={obj}>{obj}</MenuItem>
                                                    ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <ButtonContainer>
                                    <Button variant="contained" size="medium" onClick={() => cancelOrder()} >
                                        Cancel Order
                                    </Button>
                                </ButtonContainer>
                                </>
}


                            </Card>

                        </> : <></>
                }


            </RightContainer>

        </MainNav>
    )
}

const LeftContainer = styled.div`

height:500px;
margin-right:10px;
margin-left:10px;
`;

const RightContainer = styled.div`
width:300px;
height:500px;
margin-left:10px;
margin-right:10px;
`;

const ButtonContainer = styled.div`
margin-top: 10px;
margin-bottom: 10px;
display: flex;
width: 100%;
justify-content: center;
`;
const Title = styled.h3`
text-align:center;
`;

const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;

border-radius: 5px;
padding:10px;
`;

export default ShowOrderPage