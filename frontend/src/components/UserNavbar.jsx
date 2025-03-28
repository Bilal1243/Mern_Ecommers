import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";

function UserNavbar() {
  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Ecommers</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto p-3">
              <Link to={"/"} className="me-3">
                Home
              </Link>
              <Link to={"/products"} className="me-3">
                products
              </Link>
              <Link to={"/user/cart"} className="me-3">
                Cart
              </Link>

              <Link onClick={() => logoutHandler()}>Logout</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default UserNavbar;
