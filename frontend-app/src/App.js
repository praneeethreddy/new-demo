
import React, { useState, useEffect } from "react";
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import About from "./Components/HomeLogin/About";
import Login from "./Components/HomeLogin/Login";
import Projects from "./Components/HomeLogin/Projects";
import DashboardPage from "./Components/Admin/DashboardPage";
import SideBar from "./Components/Admin/SideBarCustomer";
import Header from "./Components/Admin/Header";
import Cart from "./Components/Cart/Index";
import CheckoutPage from "./Components/Checkout/Index"
import { Cookies } from "react-cookie";
import { redirect,Navigate, } from "react-router-dom";
import Orders from "./Components/Orders/Orders";
import ShowOrderPage from "./Components/Orders/ShowOrderPage";
import DashboardPageAdmin from "./Components/AdminDashboard/DashboardPage";
import Form from "./Components/AdminProductPage/Form";
import EditForm from "./Components/AdminProductPage/EditForm";
import AdminOrders from "./Components/AdminOrders/Orders";
import ShowOrderPageAdmin from "./Components/AdminOrders/ShowOrderPage";
import RegistrationForm from "./Components/Registration/RegistrationForm";
import SideNav from "./Components/Admin/SideBarCustomer";
import SideNavCustomer from "./Components/Admin/SideBarCustomer";
import SideNavAdmin from "./Components/Admin/SideBarAdmin";

function App() {
  const [message, setMessage] = useState("");
  const cookies = new Cookies()
  const[user,setUser] = useState("")
  const admin = cookies.get("admin");
  const customer = cookies.get("customer");

  


  useEffect(() => {
    if(cookies.get("admin"))
        setUser('admin')
    else if(cookies.get("customer"))
        setUser("customer")
  }, [])
  



  return (
    <div className="App">
    <BrowserRouter>
    <Header user={user} setUser={setUser}/>
    {
      user == "customer"?
      <SideNavCustomer/>:
      user == "admin"?
      <SideNavAdmin/>
      :<></>
    }
   
  

    
      <Routes> 
      
            <Route  path="/"  element={
              ( user=="" )?
              <Login /> 
              :
              (user =="customer")?
              <Navigate to="/dashboard" />
              :<Navigate to="/adminDashboard" />
            }
            /> 


           
            <Route  path="/userRegistration" element={<RegistrationForm/>}/>
            
            <Route   path="/dashboard" element={<DashboardPage/>}/>
            <Route   path="/cart" element={<Cart/>}/>
            <Route   path="/checkout" element={<CheckoutPage/>}/>
            <Route   path="/customerOrders" element={<Orders/>}/>
            <Route   path="/orderPage" element={<ShowOrderPage/>}/>
          
            <Route   path="/adminDashboard" element={<DashboardPageAdmin/>}/>
            <Route   path="/addProductAdmin" element={<Form/>}/>
            <Route   path="/adminEditProduct" element={<EditForm/>}/>
            <Route   path="/adminOrderDetails" element={<AdminOrders/>}/>
            <Route   path="/adminSingleOrderPage" element={<ShowOrderPageAdmin/>}/>
             


       </Routes> 
    
    </BrowserRouter>
    </div>
  );
}

export default App;
