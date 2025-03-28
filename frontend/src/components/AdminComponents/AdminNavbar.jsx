import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

function AdminNavbar() {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/admin/dashboard" className="fw-bold">
          E-commerce Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/products" className="fw-semibold">
              Products
            </Nav.Link>
            <Nav.Link onClick={logoutHandler} className="fw-semibold text-danger">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
