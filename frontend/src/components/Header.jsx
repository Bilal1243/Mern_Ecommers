import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutUserMutation } from "../slices/userApiSlice";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser().unwrap();
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <Navbar.Brand as={Link} to="/">
              Ecommers
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/cart">
                  <FaShoppingCart /> Cart
                </Nav.Link>

                {userInfo ? (
                  <>
                    <NavDropdown title={userInfo.name} id="username">
                      <NavDropdown.Item as={Link} to={"/profile"}>
                        Profile
                      </NavDropdown.Item>

                      <NavDropdown.Item onClick={logoutHandler} type="Button">
                        logout
                      </NavDropdown.Item>

                    </NavDropdown>
                  </>
                ) : (
                  <Nav.Link as={Link} to="/login">
                    <FaUser /> Sign In
                  </Nav.Link>
                )}

                {userInfo && userInfo.isAdmin && (
                  <>
                    <NavDropdown title={"Admin"} id="adminname">
                      <NavDropdown.Item as={Link} to={"/admin/products"}>
                        Products
                      </NavDropdown.Item>

                      <NavDropdown.Item as={Link} to={"/admin/orderlist"}>
                        Orders
                      </NavDropdown.Item>

                      <NavDropdown.Item as={Link} to={"/admin/userlist"}>
                        Users
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
