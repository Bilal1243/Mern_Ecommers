import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, replace } from "react-router-dom";

function PrivateRoutes() {
  const { userInfo } = useSelector((state) => state.auth);

  return <>{userInfo ? <Outlet /> : <Navigate to="/login" replace />}</>;
}

export default PrivateRoutes;
