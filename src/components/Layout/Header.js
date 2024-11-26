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
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
            <Link to="/" className="navbar-brand text-capitalize">
              <h2>NovaShop</h2>
            </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                <div style={{width: "50px"}}>
                  <div className="text-white bg-transparent position-relative">
                    <NavLink to="/cart" className="nav-link">
                      <BsCart4 className="fs-4 text-white" />
                    </NavLink>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                      {cart?.length}
                    </span>
                  </div>
                  </div>
                </li>
            </ul>
            <div role="search">
                <SearchInput />
              
            </div>
          </div>
        </div>
      </nav>

      {/* second navbar */}
      {/* <nav
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
      </nav> */}
    </>
  );
};

export default Header;
