import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import "./Login.css";
import Lottie from "lottie-react";
import animationData from "../../Animation - 1716533799920.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  // form function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");

        toast.success("Sign in successfully", 8000);
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      
      <div className=" login-back p-lg-5 bg-body-secondary">
        <div className="row mx-lg-5">
          <div className="col-12 col-md-6 d-none d-md-block">

            <div className="m-auto anime pt-5">
              <Lottie animationData={animationData} />
            </div>
          </div>
          <div className="col-10 col-md-6 ps-lg-5 mx-auto ">
            <div className="login border border-2 bg-light w-lg-75 ms-lg-5">
              <h1 >Welcome Back </h1>
              <p className="mt-0">Welcome back! please enter your details.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control bg-transparent border-0 border-bottom "
                    placeholder="Email "
                    id="exampleInputEmail1"
                  />
                </div>
                <div className="mb-3">
                  
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control bg-transparent border-0 border-bottom "
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-transparent text-primary text-decoration-underline"
                  onClick={() => {
                    navigate(`/forgot-password`);
                  }}
                >
                  <small>forgot password?</small>
                </button>
                <button
                  type="submit"
                  className="btn text-white bg-info w-100"
                  
                >
                  Sign In
                </button>
                
              </form>
              <hr />
              <small>don't have an account? <button className="bg-transparent border-0 text-primary text-decoration-underline" onClick={() => {
                    navigate(`/register`);
                  }}>Sign up</button> here</small>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
  
};

export default Login;
