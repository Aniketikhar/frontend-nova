import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3">
                <div className="footer">
                  <h2 className="footer-title">NovaShop</h2>
                  <p>
                    Discover seamless shopping with NovaShop - your ultimate
                    eCommerce solution for a stellar online store experience.
                  </p>
                  <ul className="footer-links list-unstyled">
                    <li>
                      <a href="#">
                        <i className="fa fa-map" />
                        Jagnade Square, Nagpur
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-phone" />
                        +91 9518926198
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-envelope" />
                        novashop@ecommerce.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="footer">
                  <h3 className="footer-title">Categories</h3>
                  <ul className="footer-links list-unstyled">
                    <li>
                      <Link className="dropdown-item" to={`/category/mobiles`}>
                        Mobiles
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={`/category/laptops`}>
                        Laptops
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={`/category/tvs`}>
                        TV's
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/headphones`}
                      >
                        Headphones
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={`/category/watches`}>
                        Watches
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3 ">
                <div className="footer">
                  <h3 className="footer-title">Informations</h3>
                  <ul className="footer-links list-unstyled">
                    <li>
                      <a href="/about">About Us</a>
                    </li>
                    <li>
                      <a href="/contact">Contact Us</a>
                    </li>
                    <li>
                      <a href="/policy">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="/tandc">Terms &amp; Conditions</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="footer">
                  <h3 className="footer-title">Services</h3>
                  <ul className="footer-links list-unstyled">
                    <li>
                      <a href="dashboard/user/profile">My Account</a>
                    </li>
                    <li>
                      <a href="/cart">View Cart</a>
                    </li>
                    
                    <li>
                      <a href="/dashboard/user/orders">Track My Order</a>
                    </li>
                   
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="bottom-footer" className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <ul className="footer-payments">
                  <li>
                    <a href="#">
                      <i class="fa-brands fa-cc-visa text-secondary" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-credit-card text-secondary" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-cc-paypal text-secondary" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-cc-mastercard text-secondary" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-cc-discover text-secondary" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-cc-amex text-secondary" />
                    </a>
                  </li>
                </ul>
                <span className="copyright mb-3">
                  Copyright &copy; 2024. All Rights Reserved | This Project is
                  made by{" "}
                  <a
                    href="/"
                    target="_blank"
                    class="fs-5 fst-italic text-decoration-none"
                    style={{ color: "#DC3545" }}
                  >
                    NovaShop
                  </a>
                  .
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>

    // <div className="footer">
    //   <p className="text-center mt-3">
    //     <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
    //     <Link to="/policy">Privacy Policy</Link>
    //   </p>
    //   <h5 className="text-center">All Right Reserved &copy; Aniket IKhar</h5>
    // </div>
  );
};

export default Footer;
