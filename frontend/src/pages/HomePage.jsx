import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/UserNavbar";

function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();


  return (
    <>
      <Navbar />
    </>
  );
}

export default HomePage;
