import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { BsGithub, BsTwitterX, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="nova-footer">
      {/* Newsletter bar */}
      <div className="footer-newsletter">
        <div className="container footer-newsletter__inner">
          <div>
            <h3 className="footer-newsletter__title">Stay in the loop 📬</h3>
            <p className="footer-newsletter__sub">Get the latest deals and offers directly in your inbox.</p>
          </div>
          <form className="footer-newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="footer-newsletter__input"
            />
            <button type="submit" className="footer-newsletter__btn">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="container">
          <div className="row g-4">
            {/* Brand */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="footer-brand">
                <h2 className="footer-brand__name">🛍️ NovaShop</h2>
                <p className="footer-brand__desc">
                  Discover seamless shopping with NovaShop — your ultimate
                  e-commerce destination for premium electronics.
                </p>
                <div className="footer-socials">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-link" title="GitHub">
                    <BsGithub />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-link" title="Twitter">
                    <BsTwitterX />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-link" title="Instagram">
                    <BsInstagram />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-link" title="LinkedIn">
                    <BsLinkedin />
                  </a>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="col-6 col-md-3 col-lg-2">
              <h4 className="footer-col__title">Categories</h4>
              <ul className="footer-links">
                <li><Link to="/category/mobiles">📱 Mobiles</Link></li>
                <li><Link to="/category/laptops">💻 Laptops</Link></li>
                <li><Link to="/category/tvs">📺 TVs</Link></li>
                <li><Link to="/category/headphones">🎧 Headphones</Link></li>
                <li><Link to="/category/watches">⌚ Watches</Link></li>
              </ul>
            </div>

            {/* Information */}
            <div className="col-6 col-md-3 col-lg-2">
              <h4 className="footer-col__title">Information</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/policy">Privacy Policy</Link></li>
                <li><Link to="/tandc">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-12 col-md-6 col-lg-4">
              <h4 className="footer-col__title">Services & Contact</h4>
              <ul className="footer-links footer-contact">
                <li>
                  <span className="footer-contact__icon">📍</span>
                  Jagnade Square, Nagpur
                </li>
                <li>
                  <span className="footer-contact__icon">📞</span>
                  +91 9518926198
                </li>
                <li>
                  <span className="footer-contact__icon">✉️</span>
                  novashop@ecommerce.com
                </li>
              </ul>
              <ul className="footer-links mt-3">
                <li><Link to="/dashboard/user/profile">My Account</Link></li>
                <li><Link to="/cart">View Cart</Link></li>
                <li><Link to="/dashboard/user/orders">Track My Order</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom__inner">
          <span className="footer-bottom__copy">
            © {currentYear} NovaShop. All Rights Reserved.
          </span>
          <div className="footer-payments">
            <span title="Visa">💳</span>
            <span title="Mastercard">🏦</span>
            <span title="PayPal">🅿️</span>
            <span title="UPI">📲</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
