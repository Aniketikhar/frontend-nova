import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "./Header.css";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    // toast
  };

  return (
    <>
      {/* first navbar */}

      {/* <div className="bg-dark text-white d-flex justify-content-between px-5  first-navbar">
        <div>
          <div className="p-2 d-inline-block">
            <span className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-telephone text-danger"
                viewBox="0 0 16 16"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
            </span>
            <span>+012-34-56-78</span>
          </div>
          <div className="p-2 d-inline-block">
            <span className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope text-danger"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
            </span>
            <span>email@email.com</span>
          </div>
          <div className="p-2 d-inline-block">
            <span className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt text-danger"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </span>
            <span>1734 stonecoal road</span>
          </div>
        </div>
        <div>
          <div className="p-2 d-inline-block ms-auto">
            <div className="dropdown">
              <a
                className="text-decoration-none text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person text-danger"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                </span>
                Account
              </a>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
              </ul>
            </div>

           
          </div>
        </div>
      </div> */}

      {/* second navbar */}
      <nav
        className=" navbar-expand-lg sticky-top navbar-dark
      
      bg-dark second-navbar"
        style={{}}
      >
        <div className="container-fluid  d-flex justify-content-around">
          <div className="flex-item-1 navbar-brand">
            <Link to="/" className="navbar-brand text-capitalize">
              <h2>NovaShop</h2>
            </Link>
          </div>
          <div className="flex-item-2 ">
            <SearchInput />
          </div>
          <div className="flex-item-3">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown u">
                  <Link
                    className="nav-link dropdown-toggle q"
                    to={"/categories"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    {categories?.map((c) => (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {!auth.user ? (
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Account
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to="/register"
                          className="nav-link not-login text-black"
                        >
                          Sign Up
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          className="nav-link not-login text-black"
                        >
                          Sign In
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="dropdown-item"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item"
                          >
                            Sign Out
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
                <li className="nav-item ">
                  <div className="text-white bg-transparent position-relative">
                    <NavLink to="/cart" className="nav-link">
                      <BsCart4 className="fs-4 text-white" />
                    </NavLink>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.length}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
