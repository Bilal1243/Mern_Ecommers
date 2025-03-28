import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminComponents/AdminNavbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../slices/adminApiSlice";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function AdminEditProduct() {
  const { id } = useParams();

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [og_price, setOg_price] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [productImg, setProductImg] = useState("");
  const [category, setCategory] = useState("");

  const { data: products, refetch } = useGetProductsQuery();
  const { data: product } = useGetProductByIdQuery({ id });
  const [updateProduct] = useUpdateProductMutation();

  const navigate = useNavigate();

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("productName", productName);
      formData.append("brand", brand);
      formData.append("og_price", og_price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("category", category);

      if (productImg) {
        formData.append("productImg", productImg);
      }

      await updateProduct({ id, data: formData }).unwrap();
      refetch();

      setProductName("");
      setBrand("");
      setCategory("");
      setDescription("");
      setOg_price("");
      setProductImg("");
      setStock("");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setBrand(product.brand);
      setOg_price(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setCategory(product.category);
    }
  }, [product]);

  return (
    <>
      <AdminNavbar />

      <div className="container bg-light mt-5">
        <Form noValidate onSubmit={editHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>product name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>original price</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="original price"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={og_price}
                  onChange={(e) => setOg_price(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>product image</Form.Label>
              <Form.Control
                type="file"
                placeholder="img"
                required
                accept=".png"
                onChange={(e) => {
                  setProductImg(e.target.files[0]);
                }}
              />
              <img src={product?.productImage} alt="" className="w-50 h-50" />
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </>
  );
}

export default AdminEditProduct;
