import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../slices/adminApiSlice";
import {
  Col,
  Form,
  Row,
  Button,
  Card,
  Spinner,
  Alert,
  Container,
} from "react-bootstrap";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productImg, setProductImg] = useState("");

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setProductName(product.productName || "");
      setBrand(product.brand || "");
      setPrice(product.price || "");
      setStock(product.stock || "");
      setDescription(product.description || "");
      setCategory(product.category || "");
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("category", category);
      if (productImg) formData.append("productImg", productImg);

      await updateProduct({ id, data: formData }).unwrap();
      navigate("/admin/products");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Card className="shadow-lg p-4">
          <h2 className="text-center text-primary mb-4">Edit Product</h2>

          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger">
              {error?.data?.message || "Failed to load product details."}
            </Alert>
          ) : (
            <Form onSubmit={handleUpdate}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock quantity"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="8">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProductImg(e.target.files[0])}
                  />
                  {product?.productImage && (
                    <img
                      src={product.productImage}
                      alt="Product"
                      className="img-fluid mt-2 rounded"
                      style={{ maxHeight: "150px" }}
                    />
                  )}
                </Form.Group>
              </Row>

              <div className="text-center">
                <Button type="submit" variant="primary" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Updating...
                    </>
                  ) : (
                    "Update Product"
                  )}
                </Button>
                <Button
                  variant="secondary"
                  className="ms-3"
                  onClick={() => navigate("/admin/products")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Card>
      </Container>
    </>
  );
}

export default AdminEditProduct;
