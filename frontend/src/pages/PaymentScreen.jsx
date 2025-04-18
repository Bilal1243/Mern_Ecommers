import { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/cart");
    }
  }, [navigate, shippingAddress]);

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1 className="mb-4">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col className="my-2">
              <Form.Check
                type="radio"
                label="Razorpay"
                id="PayPal"
                name="paymentMethod"
                value="Razorpay"
                checked={paymentMethod === "Razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mt-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
