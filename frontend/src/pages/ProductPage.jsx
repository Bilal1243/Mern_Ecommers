import React, { useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../slices/productApiSlice";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

function ProductPage() {
  const [qty, setQty] = useState(1);

  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductQuery({ id: productId });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/user/cart");
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading product
      </div>
    );

  return (
    <>
      <UserNavbar />
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Image */}
            <div className="flex justify-center items-center p-4">
              <img
                src={product.productImage}
                alt={product.productName}
                className="img-fluid object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col gap-4">
              <h1 className="text-3xl font-bold">{product.productName}</h1>
              <h2 className="text-xl text-gray-500">Brand: {product.brand}</h2>
              <p className="text-lg font-semibold text-green-600">
                ${product.price}
              </p>
              <p className="text-sm text-gray-700">{product.description}</p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
              <p
                className={`text-sm font-semibold ${
                  product.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.stock > 0 ? `In Stock` : "Out of Stock"}
              </p>
              {product.stock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as={"select"}
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.stock === 0}
                  onClick={addToCartHandler}>
                    add to cart
                  </Button>
              </ListGroup.Item>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
