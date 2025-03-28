import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginUserMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

function LoginPage() {
  const { userInfo } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await loginUser({ email, password }).unwrap();

      dispatch(setCredentials({ ...response }));
      navigate("/");
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
      <form onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <Link to={"/register"}>Create Account</Link>
    </>
  );
}

export default LoginPage;
