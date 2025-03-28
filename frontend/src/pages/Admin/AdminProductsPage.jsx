import React from "react";
import AdminNavbar from "../../components/AdminComponents/AdminNavbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/adminApiSlice";
import { Table, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminProductsPage() {
  const { data: products } = useGetProductsQuery();

  const navigate = useNavigate();

  return (
    <>
      <AdminNavbar />

      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={() => navigate("/addProduct")}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.productName}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <Button
                  variant="light"
                  className="btn-sm"
                  onClick={() => navigate(`/editProduct/${product._id}`)}
                >
                  <FaEdit />
                </Button>
                <Button variant="danger" className="btn-sm">
                  <FaTrash style={{ color: "white" }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AdminProductsPage;
