import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import "./Header.css";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineStorefront } from "react-icons/md";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="nova-navbar navbar navbar-expand-lg">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="nova-brand navbar-brand">
          {/* <MdOutlineStorefront style={{ fontSize: "1.6rem" }} /> */}
          NovaShop
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler nova-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#novaNavbar"
          aria-controls="novaNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse nova-collapse" id="novaNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
            {/* Categories Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nova-nav-link nav-link dropdown-toggle d-flex align-items-center gap-1"
                to="/categories"
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu nova-dropdown-menu">
                <li>
                  <Link className="nova-dropdown-item dropdown-item" to="/categories">
                    All Categories
                  </Link>
                </li>
                <li><hr className="dropdown-divider" style={{ borderColor: "var(--border)" }} /></li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link
                      className="nova-dropdown-item dropdown-item"
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* Right side */}
          <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
            {/* Search */}
            <SearchInput />

            {/* Cart */}
            <NavLink to="/cart" className="nova-cart-wrap text-decoration-none">
              <BsCart3 className="nova-cart-icon" />
              {cart?.length > 0 && (
                <span className="nova-cart-badge">{cart.length}</span>
              )}
            </NavLink>

            {/* Auth */}
            {!auth?.user ? (
              <div className="d-flex gap-2">
                <NavLink to="/login" className="nova-btn-signin nav-link">
                  Sign In
                </NavLink>
                <NavLink to="/register" className="nova-btn-signup nav-link">
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="dropdown">
                <div
                  className="nova-user-chip dropdown-toggle"
                  data-bs-toggle="dropdown"
                  id="userMenuBtn"
                >
                  <div className="nova-user-avatar">
                    {getInitials(auth?.user?.name)}
                  </div>
                  <span>{auth?.user?.name?.split(" ")[0]}</span>
                </div>
                <ul className="dropdown-menu nova-dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                      className="nova-dropdown-item dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="nova-dropdown-item dropdown-item"
                      style={{ color: "#FF4500 !important" }}
                    >
                      Sign Out
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
