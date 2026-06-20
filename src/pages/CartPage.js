import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate, Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "./CartPage.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Compute aggregated items (merge duplicates)
  const cartItems = React.useMemo(() => {
    const map = {};
    cart?.forEach((item) => {
      if (map[item._id]) {
        map[item._id].qty += 1;
      } else {
        map[item._id] = { ...item, qty: 1 };
      }
    });
    return Object.values(map);
  }, [cart]);

  const totalPrice = () => {
    try {
      const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      return total.toLocaleString("en-IN", { style: "currency", currency: "INR" });
    } catch { return "₹0"; }
  };

  const setQty = (productId, newQty) => {
    if (newQty < 1) return;
    // Rebuild flat cart array from aggregated items with updated qty
    const updated = [];
    cartItems.forEach((item) => {
      const q = item._id === productId ? newQty : item.qty;
      for (let i = 0; i < q; i++) {
        const { qty, ...rest } = item;
        updated.push(rest);
      }
    });
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeCartItem = (productId) => {
    const updated = cart.filter((item) => item._id !== productId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Item removed");
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) { console.log(error); }
  };

  useEffect(() => { getToken(); }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (!cart?.length) {
    return (
      <Layout title="Your Cart — NovaShop">
        <div className="cart-empty">
          <span className="cart-empty__icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Start shopping!</p>
          <Link to="/" className="cart-empty__cta">Browse Products</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Your Cart — NovaShop">
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1 className="cart-header__title">Shopping Cart</h1>
            <span className="cart-header__count">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="row g-4">
            {/* Items */}
            <div className="col-12 col-lg-8">
              <div className="cart-items">
                {cartItems.map((p) => (
                  <div className="cart-item" key={p._id}>
                    {/* Image */}
                    <div
                      className="cart-item__img-wrap"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="cart-item__img"
                      />
                    </div>

                    {/* Info */}
                    <div className="cart-item__info">
                      {p.brand && <span className="cart-item__brand">{p.brand}</span>}
                      <h3
                        className="cart-item__name"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        {p.name}
                      </h3>
                      <p className="cart-item__unit-price">
                        {p?.price?.toLocaleString("en-IN", { style: "currency", currency: "INR" })} each
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="cart-item__controls">
                      <div className="cart-qty">
                        <button className="cart-qty__btn" onClick={() => setQty(p._id, p.qty - 1)}>−</button>
                        <span className="cart-qty__val">{p.qty}</span>
                        <button className="cart-qty__btn" onClick={() => setQty(p._id, p.qty + 1)}>+</button>
                      </div>
                      <p className="cart-item__total">
                        {(p.price * p.qty).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                      </p>
                      <button
                        className="cart-item__remove"
                        onClick={() => removeCartItem(p._id)}
                        title="Remove item"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="col-12 col-lg-4">
              <div className="cart-summary">
                <h2 className="cart-summary__title">Order Summary</h2>
                <div className="cart-summary__row">
                  <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
                  <span>{totalPrice()}</span>
                </div>
                <div className="cart-summary__row">
                  <span>Shipping</span>
                  <span className="cart-summary__free">FREE</span>
                </div>
                <div className="cart-summary__divider" />
                <div className="cart-summary__row total">
                  <span>Total</span>
                  <span>{totalPrice()}</span>
                </div>

                {/* Address */}
                {auth?.user?.address ? (
                  <div className="cart-address">
                    <p className="cart-address__label">📦 Deliver to</p>
                    <p className="cart-address__val">{auth.user.address}</p>
                    <button
                      className="cart-address__change"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Change Address
                    </button>
                  </div>
                ) : (
                  <div className="cart-address">
                    {auth?.token ? (
                      <button
                        className="btn-nova-primary w-100"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Add Delivery Address
                      </button>
                    ) : (
                      <button
                        className="btn-nova-primary w-100"
                        onClick={() => navigate("/login", { state: "/cart" })}
                      >
                        Login to Checkout
                      </button>
                    )}
                  </div>
                )}

                {/* Payment */}
                {clientToken && cart?.length > 0 && (
                  <div className="cart-payment">
                    <DropIn
                      options={{ authorization: clientToken, paypal: { flow: "vault" } }}
                      onInstance={(i) => setInstance(i)}
                    />
                    <button
                      className="btn-nova-primary w-100 mt-2"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                      style={{ opacity: (!instance || !auth?.user?.address) ? 0.5 : 1 }}
                    >
                      {loading ? "Processing..." : "Place Order →"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;