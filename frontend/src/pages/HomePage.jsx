import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/userApiSlice";


function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const { data: products } = useGetProductsQuery();

  return (
    <>
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-4">Explore Our Products</h2>
        <Row className="g-4">
          {products?.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="border rounded-3 shadow-sm h-100 p-3"
                style={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="overflow-hidden rounded">
                  <Card.Img
                    variant="top"
                    src={product.productImage}
                    className="img-fluid"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="fw-bold text-truncate"
                    title={product.productName}
                  >
                    {product.productName}
                  </Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    {product.description.length > 80
                      ? product.description.substring(0, 80) + "..."
                      : product.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <h5 className="fw-bold text-success m-0">
                      ${product.price}
                    </h5>
                    <Button
                      variant="primary"
                      className="rounded-pill px-4"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
