import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import OrderScreen from "./pages/OrderScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import ProfileScreen from "./pages/ProfileScreen";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminProductsPage from "./pages/Admin/AdminProductsPage";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import UserListScreen from "./pages/Admin/UserListScreen";
import UserEditScreen from "./pages/Admin/UserEditScreen";

function App() {
  return (
    <>
      <Header />
      <main className="mt-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductPage />}></Route>
            <Route path="/cart" element={<CartPage />} />

            <Route path="" element={<PrivateRoutes />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>

            <Route
              path="/admin/products"
              element={<AdminProductsPage />}
            ></Route>
            <Route path="/addproduct" element={<AdminAddProduct />} />
            <Route path="/editProduct/:id" element={<AdminEditProduct />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
