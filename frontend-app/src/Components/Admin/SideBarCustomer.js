import React,{useState} from 'react';
import { Cookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const SideNavContainer = styled.div`

position: absolute;
  width: 200px;
  height: 100vh;
  background-color: #f1f1f1;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NavItem = styled.li`
  padding: 10px;
  border-bottom: 1px black solid;
  cursor: pointer;

  a {
    color: #333;
    text-decoration: none;
  }

  a.active {
    font-weight: bold;
  }

  &:hover {
    background-color: #b3aeaead;
  }
`;

const SideNavCustomer = () => {
  
  const cookies = new Cookies();

  console.log("cookies data : ",cookies.get('customer'))
    const [pathname, setpathname] = useState(window.location.pathname.split("/")[1])
  return (
    <SideNavContainer>
      {
         
        <NavList>
      <NavItem>
          <NavLink   to="/dashboard" className={pathname == "dashboard" ? "active":""}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/customerOrders" className={pathname == "orders" ? "active":""}>
            Orders
          </NavLink>
        </NavItem>
        
      </NavList>
      
      }



      
    </SideNavContainer>
  );
};


export default SideNavCustomer