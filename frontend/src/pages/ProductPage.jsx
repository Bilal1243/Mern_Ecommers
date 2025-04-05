import React, { useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  useGetProductQuery,
  useAddProductReviewMutation,
} from "../slices/productApiSlice";
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  ListGroup,
  
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Message from "../components/Message";
import Rating from "../components/Rating";

function ProductPage() {
  const { userInfo } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(0);
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductQuery({ id: productId });
  const [addReview] = useAddProductReviewMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (!userInfo) {
      return navigate("/login");
    }
    dispatch(addToCart({ ...product, qty }));
    navigate("/user/cart");
  };

  if (isLoading)
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Error loading product
      </div>
    );

  const addReviewHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await addReview({ productId, rating, comment }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
      alert(error?.message || error?.data?.message)
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <Card className="shadow-lg rounded-lg p-4">
          <Row>
            {/* Product Image */}
            <Col
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src={product.productImage}
                alt={product.productName}
                fluid
                className="rounded-lg shadow-sm"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </Col>

            {/* Product Details */}
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="fw-bold">{product.productName}</h2>
                  <h5 className="text-muted">Brand: {product.brand}</h5>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3 className="text-success fw-bold">${product.price}</h3>
                  <p className="text-secondary">{product.description}</p>
                  <span
                    className={`fw-bold ${
                      product.stock > 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </ListGroup.Item>

                {userInfo ? (
                  <>
                    {Number(product.stock) > 0 && (
                      <ListGroup.Item>
                        <Row className="align-items-center">
                          <Col sm={4} className="fw-bold">
                            Quantity:
                          </Col>
                          <Col sm={8} className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                setQty((prev) => Math.max(prev - 1, 1))
                              }
                              disabled={qty <= 1}
                            >
                              -
                            </Button>

                            <span className="mx-3 fw-bold">{qty}</span>

                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                setQty((prev) =>
                                  Math.min(prev + 1, Number(product.stock))
                                )
                              }
                              disabled={qty >= Number(product.stock)}
                            >
                              +
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className="w-100 btn-lg"
                        variant={product.stock > 0 ? "success" : "secondary"}
                        disabled={product.stock === 0}
                        onClick={addToCartHandler}
                      >
                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </ListGroup.Item>
                  </>
                ) : (
                  <Button
                    className="w-100 btn-lg"
                    variant={"secondary"}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                )}
              </ListGroup>
            </Col>
          </Row>

          {/* Reviews Section */}
          <h2 className="mt-5">Customer Reviews</h2>
          <Card className="p-3 shadow-sm">
            {product.reviews.length === 0 ? (
              <Message>No Reviews Yet</Message>
            ) : (
              <ListGroup variant="flush">
                {product.reviews.map((review, index) => (
                  <ListGroup.Item key={index} className="mb-2">
                    <div className="d-flex align-items-center">
                      <strong className="me-2">{review.name}</strong>
                      <Rating value={review.rating} />
                    </div>
                    <small className="text-muted">
                      {review.createdAt.substring(0, 10)}
                    </small>
                    <p className="mt-2">{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>

          {/* Write a Review */}
          <h2 className="mt-4">Write a Review</h2>
          <Card className="p-4 shadow-sm">
            {userInfo ? (
              <Form onSubmit={addReviewHandler}>
                <Form.Group className="my-3" controlId="rating">
                  <Form.Label className="fw-bold">Rating</Form.Label>
                  <Form.Select
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="my-3" controlId="comment">
                  <Form.Label className="fw-bold">Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Submit Review
                </Button>
              </Form>
            ) : (
              <Message>
                Please <Link to="/login">sign in</Link> to write a review.
              </Message>
            )}
          </Card>
        </Card>
      </div>
    </>
  );
}

export default ProductPage;
