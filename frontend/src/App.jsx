import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useSelector } from "react-redux";
import AdminNavigator from "./components/AdminComponents/AdminNavigator";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import OrderScreen from "./pages/OrderScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import ProfileScreen from "./pages/ProfileScreen";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo && userInfo.isAdmin) return <AdminNavigator />;

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductPage />}></Route>
        <Route path="/user/cart" element={<CartPage />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </>
  );
}

export default App;
