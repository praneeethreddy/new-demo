import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function SingleOrderTable({orderDetails}) {
  
    const cookies = new Cookies()
    const navigate = useNavigate();
   const [addressShow,setAddressShow] = React.useState("");
    const multiplyFun = (a, b) => {
        const total = parseFloat(((a * b).toFixed(2)));
        return total
    };

    React.useEffect(() => {
      
        const fectAddressDetails = async () =>{
            const response = await axios.get(`http://localhost:8000/address/${orderDetails.address_id}`)
            .then( e => e.data.data);
            
            console.log("response data : ",response)

            const addresData = response.address_one +" - "+response.pin
            setAddressShow(addresData)
            }

            fectAddressDetails();
      
    }, [])
    


const convertToDateText = (dateString) => {
    const date = new Date(dateString);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
  return (<>
  
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                orderDetails.products_details.map((obj)=>(
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {obj.title}
                </StyledTableCell>
                <StyledTableCell align="right">{obj.qty}</StyledTableCell>
                <StyledTableCell align="right">{obj.price}</StyledTableCell>
                <StyledTableCell align="right">{
                        (multiplyFun( parseInt(obj.qty) , parseFloat(obj.price) ) + multiplyFun( multiplyFun( parseInt(obj.qty) , parseFloat(obj.price) ) , 0.085)).toFixed(2) 
                        } $</StyledTableCell>
                </StyledTableRow>
                )
                )
            }
          </TableBody>
      </Table>
    </TableContainer>







    <TableContainer component={Paper} style={{marginTop:'20px'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        
        {
           <TableBody>
            
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Order ID
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails._id}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Payment Type
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails.payment_type}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Card Number 
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails.card_number}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Delivery Type
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails.delivery_type}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Delivery Address
                </StyledTableCell>
                <StyledTableCell align="right">{addressShow}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Delivery Status
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails.delivery_status=="CCancelled"?"Inprogress":"Delivered"}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Total
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails.total} $</StyledTableCell>
            </StyledTableRow>
            {/* //cancellation table */}
                {
                    orderDetails.cancel_type!="none"?
                    <>
                    <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Cancellation Reason
                    </StyledTableCell>
                    <StyledTableCell align="right">{orderDetails.cancel_reason}</StyledTableCell>
                    </StyledTableRow>
                    </>:
                    <></>
                    
                }
            

          </TableBody>

        }
        
      </Table>
    </TableContainer>
    </>
  );
}
