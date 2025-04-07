import React from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import { useSelector } from "react-redux";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  console.log(cart);

  const navigate = useNavigate();

  const placeOrderHandler = () => {
    alert("Order placed successfully!");
    navigate("/order");
  };

  return (
    <>
      <UserNavbar />
      <CheckoutSteps step1 step2 step3 step4 />
      <Container className="my-5 px-3">
        <Row className="gy-4">
          {/* LEFT */}
          <Col lg={8}>
            <Card className="p-4 shadow-sm border-0">
              <h4 className="text-primary mb-3">Shipping</h4>
              <p>
                <strong>Address:</strong> {cart?.shippingAddress.address},{" "}
                {cart?.shippingAddress.city} {cart?.shippingAddress.postalCode},{" "}
                {cart?.shippingAddress.country}
              </p>

              <hr className="my-4" />

              <h4 className="text-primary mb-3">Payment Method</h4>
              <p>
                <strong>Method:</strong> {cart?.paymentMethod}
              </p>

              <hr className="my-4" />

              <h4 className="text-primary mb-3">Order Items</h4>
              {cart?.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart?.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex align-items-center justify-content-between px-0"
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "15px" }}
                      >
                        <Image
                          src={item.productImage}
                          alt={item.name}
                          fluid
                          rounded
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                        <span>{item.productName}</span>
                      </div>
                      <div>
                        {item.qty} x ${item.price} = $
                        {(item.qty * item.price).toFixed(2)}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card>
          </Col>

          {/* RIGHT */}
          <Col lg={4}>
            <Card className="shadow-sm border-0">
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-light">
                  <h4 className="text-center text-success">Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Items</span>
                  <strong>${cart?.itemsPrice}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <strong>${cart?.shippingPrice}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Tax</span>
                  <strong>${cart?.taxPrice}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>${cart?.totalPrice}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="success"
                      className="fw-bold rounded-pill py-2"
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
