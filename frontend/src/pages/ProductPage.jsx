import React, { useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../slices/productApiSlice";
import { Row, Col, Image, Form, Button, Card, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

function ProductPage() {
  const [qty, setQty] = useState(1);
  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery({ id: productId });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/user/cart");
  };

  if (isLoading) return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500 font-semibold">Error loading product</div>;

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <Card className="shadow-lg rounded-lg p-4">
          <Row>
            {/* Product Image */}
            <Col md={6} className="d-flex align-items-center justify-content-center">
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
                  <span className={`fw-bold ${product.stock > 0 ? "text-success" : "text-danger"}`}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </ListGroup.Item>

                {product.stock > 0 && (
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col sm={4} className="fw-bold">Quantity:</Col>
                      <Col sm={8}>
                        <Form.Select
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="form-control w-50"
                        >
                          {[...Array(product.stock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
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
              </ListGroup>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default ProductPage;
