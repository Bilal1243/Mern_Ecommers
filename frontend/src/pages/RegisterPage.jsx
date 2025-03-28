import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterUserMutation } from "../slices/userApiSlice";

function RegisterPage() {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser] = useRegisterUserMutation();

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    
    try {
      let response = await registerUser({
        name,
        email,
        mobileNumber,
        password,
      }).unwrap()

        navigate('/login')

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <form onSubmit={registerHandler}>
        <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="enter mobile number"
          value={mobileNumber}
          onChange={(e) => setmobileNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">register</button>
      </form>

      <Link to={"/login"}>already have an account?</Link>
    </>
  );
}

export default RegisterPage;
