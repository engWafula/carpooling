import React from "react";
import { Menu, Dropdown, Button, Space , Row , Col } from "antd";
import {Link} from 'react-router-dom'

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    <Menu>
        <Menu.Item>
        <Link
         
          to="/"
        >
          Home
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          
          to="/userbookings"
        >
          Bookings
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          
          to="/bookingRequests"
        >
          Ride requests
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
         
          to="/admin"
        >
          Car Rides
        </Link>
      </Menu.Item>
      <Menu.Item onClick={()=>{
          localStorage.removeItem('user');
          window.location.href='/login'
      }}>
          <li style={{color:'slateblue'}}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
          <Row gutter={16} justify='center'>
              <Col lg={20} sm={24} xs={24}>
              <div className="d-flex justify-content-between">
             <h1 ><b><Link to='/' style={{color:'slateblue'}}>Car Pooling</Link></b></h1>

          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>{user.username}</Button>
          </Dropdown>
        </div>
              </Col>
          </Row>
        
      </div>
      <div className="content">{props.children}</div>

      <div className="footer text-center">
      <hr />

           <p>Designed and Developed By Jyoti 🪽</p>
          
      </div>
    </div>
  );
}

export default DefaultLayout;
