import React from "react";
import UserNavbar from "../components/UserNavbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/userApiSlice";

function Products() {
  const { data: products } = useGetProductsQuery();

  const navigate = useNavigate();

  return (
    <>
      <UserNavbar />
      <Container className="my-4">
        <h2 className="text-center mb-4">Our Products</h2>
        <Row className="g-4">
          {products?.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={product.productImage}
                  className="img-fluid"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="text-truncate"
                    title={product.productName}
                  >
                    {product.productName}
                  </Card.Title>
                  <Card.Text className="text-muted" style={{ flexGrow: 1 }}>
                    {product.description}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    view
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Products;
