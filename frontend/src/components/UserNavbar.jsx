import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function UserNavbar() {
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-3">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
          Ecommers
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/" className="mx-2 fw-semibold">
              Home
            </Nav.Link>
            {userInfo ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/user/cart"
                  className="mx-2 fw-semibold"
                >
                  Cart
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="mx-2 fw-semibold">
                  Profile
                </Nav.Link>

                {/* Logout Button */}
                <Button
                  variant="outline-danger"
                  className="rounded-pill px-3 mx-2 fw-semibold"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline-danger"
                className="rounded-pill px-3 mx-2 fw-semibold"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;
