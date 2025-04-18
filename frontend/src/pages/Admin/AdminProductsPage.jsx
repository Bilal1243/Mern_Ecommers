import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/adminApiSlice";
import { Table, Row, Col, Button, Alert, Spinner, Card } from "react-bootstrap";
import { FaEdit, FaPlus } from "react-icons/fa";

function AdminProductsPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const navigate = useNavigate();

  return (
    <>

      <div className="container mt-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="text-primary">📦 Product Management</h2>
          </Col>
          <Col className="text-end">
            <Button variant="success" className="my-3 px-4" onClick={() => navigate("/addProduct")}>
              <FaPlus /> Add New Product
            </Button>
          </Col>
        </Row>

        <Card className="shadow-sm p-3">
          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger">Failed to load products.</Alert>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product._id} className="align-middle">
                    <td>{product._id}</td>
                    <td>{product.productName}</td>
                    <td className="fw-bold">${product.og_price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        className="btn-sm"
                        onClick={() => navigate(`/editProduct/${product._id}`)}
                      >
                        <FaEdit /> Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </div>
    </>
  );
}

export default AdminProductsPage;
