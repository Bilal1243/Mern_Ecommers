import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../components/Message";
import {
  useGetOrderByIdQuery,
  useOrderDeliverMutation,
} from "../slices/orderApiSlice";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { isLoading, data: order, error, refetch } = useGetOrderByIdQuery(id);

  const [isDeliverHandler] = useOrderDeliverMutation();

  const navigate = useNavigate();

  const orderDeliverHandler = async () => {
    try {
      await isDeliverHandler(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error?.message || error?.data?.message);
    }
  };

  return (
    <>
      <h1 className="mb-4">Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order?.userDetails[0]?.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order?.userDetails[0].email}`}>
                  {order?.userDetails[0].email}
                </a>
              </p>
              <p>
                <strong>Address:</strong> {order?.shippingAddress.address},{" "}
                {order?.shippingAddress.city},{" "}
                {order?.shippingAddress.postalCode},{" "}
                {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image
                            src={item?.productImage}
                            alt={item?.productName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item?.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item?.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm rounded-4">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="text-center">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {userInfo && !userInfo.isAdmin && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block w-100"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </Button>
                </ListGroup.Item>
              )}

              {userInfo &&
                userInfo.isAdmin &&
                order?.isPaid &&
                !order?.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block w-100"
                      onClick={orderDeliverHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
