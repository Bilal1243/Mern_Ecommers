import React from "react";
import UserNavbar from "../components/UserNavbar";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ _id: product._id, qty }));
  };

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <UserNavbar />
      <div className="container mt-4">
        <Row>
          <Col md={8}>
            <h2 className="mb-4 text-primary">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to={"/"}>Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id} className="cart-item">
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Image src={item.productImage} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link
                          to={`/product/${item._id}`}
                          className="cart-item-name"
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>
                        <span className="text-dark fw-bold">${item.price}</span>
                      </Col>
                      <Col md={2}>
                        <Form.Select
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                          className="cart-qty-dropdown"
                        >
                          {[...Array(Number(item.stock)).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="danger"
                          className="cart-remove-btn"
                          onClick={() => removeCartHandler(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card className="p-3 shadow-sm rounded">
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0">
                  <h4 className="fw-bold">
                    SubTotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
                  </h4>
                  <h5 className="text-success fw-bold">
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Button
                    type="button"
                    className="w-100 btn-lg btn-success"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CartPage;
