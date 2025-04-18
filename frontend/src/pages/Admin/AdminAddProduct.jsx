import { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../slices/adminApiSlice";

function AdminAddProduct() {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [og_price, setOg_price] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  const addProductHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!productImg) {
      setErrorMessage("Please upload a valid product image.");
      return;
    }

    try {
      let data = new FormData();
      data.append("productName", productName);
      data.append("brand", brand);
      data.append("og_price", og_price);
      data.append("stock", stock);
      data.append("description", description);
      data.append("category", category);
      data.append("productImg", productImg);

      await addProduct(data).unwrap();
      navigate("/admin/products");
    } catch (error) {
      setErrorMessage(error?.data?.message || "Failed to add product.");
    }
  };

  return (
    <>
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="p-4 shadow-sm w-100" style={{ maxWidth: "600px" }}>
          <h3 className="text-center mb-3">Add New Product</h3>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form noValidate onSubmit={addProductHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Original Price</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="Original Price"
                    required
                    value={og_price}
                    onChange={(e) => setOg_price(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Stock"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  required
                  onChange={(e) => setProductImg(e.target.files[0])}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
              {isLoading ? "Adding Product..." : "Add Product"}
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default AdminAddProduct;
