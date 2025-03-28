import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHomePage from "../../pages/Admin/AdminHomePage";
import AdminProductsPage from "../../pages/Admin/AdminProductsPage";
import AdminAddProduct from "../../pages/Admin/AdminAddProduct";
import AdminEditProduct from "../../pages/Admin/AdminEditProduct";

function AdminNavigator() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/admin/products" element={<AdminProductsPage />}></Route>
        <Route path="/addproduct" element={<AdminAddProduct />} />
        <Route path="/editProduct/:id" element={<AdminEditProduct />} />
      </Routes>
    </>
  );
}

export default AdminNavigator;
