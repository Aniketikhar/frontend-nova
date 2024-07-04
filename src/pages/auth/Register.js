import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res && res.data.success) {
        navigate("/login");
        toast.success("Registration successfully completed");
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
      {/* <div className="register">
      <div className="row">
        <div className="col m-5 text-center">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="d-flex">
              <div className="m-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputName"
                  required
                />
              </div>
              <div className="m-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  required
                />
               
              </div>
            </div>

            <div className="d-flex">
              <div className="m-3">
                <label htmlFor="exampleInputPhone" className="form-label">
                  Phone No.
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputPhone"
                  required
                />
              </div>
              <div className="m-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="m-3">
                <label htmlFor="exampleInputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="exampleInputAddress"
                  required
                />
              </div>
              <div className="m-3">
                <label htmlFor="exampleInputAddress" className="form-label">
                  What is your favorite sports?
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="exampleInputAnswer"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        </div>
        <div className="col">
          {/* <img src="images/register-img.jpg" alt="" />
        </div>
        </div>
      </div> */}

      <section className="py-4 " style={{ backgroundColor: "#eee" }}>
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black shadow"
                style={{ borderRadius: 25 }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Create an Account
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="text"
                              id="exampleInputName"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="form-control border-0 border-bottom"
                              placeholder="Name"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              id="exampleInputEmail1"
                              className="form-control border-0 border-bottom"
                              placeholder="Email"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-solid fa-phone fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="form-control border-0 border-bottom"
                              id="exampleInputPhone"
                              placeholder="Phone Number"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              id="exampleInputPassword1"
                              className="form-control border-0 border-bottom"
                              placeholder="Password"
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-location-crosshairs fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="form-control border-0 border-bottom"
                              id="exampleInputAddress"
                              placeholder="Address"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-solid fa-thumbtack fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="text"
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              className="form-control border-0 border-bottom"
                              placeholder="Enter key to reset your password."
                              id="exampleInputAnswer"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-3">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            defaultValue
                            id="form2Example3c"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-4">
                          <button
                            type="submit"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-warning text-white btn-lg rounded-0"
                          >
                            Sign Up
                          </button>
                        </div>
                      </form>
                      <div className="d-flex justify-content-center mx-4">
                        <small>
                          Have already an account ?{" "}
                          <button
                            className="bg-transparent border-0 text-primary text-decoration-underline"
                            onClick={() => {
                              navigate(`/login`);
                            }}
                          >
                            Sign in here
                          </button>
                        </small>
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
