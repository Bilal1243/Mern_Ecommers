import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import AdminNavbar from "../../components/AdminComponents/AdminNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminHomePage() {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <AdminNavbar />
    </>
  );
}

export default AdminHomePage;
