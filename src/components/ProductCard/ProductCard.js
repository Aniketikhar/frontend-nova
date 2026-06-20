import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { BsCartPlus } from "react-icons/bs";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Check if already in cart; if so, just notify
    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      toast("Already in cart!", { icon: "🛒" });
      return;
    }
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to cart!");
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      <div className="product-card__img-wrap">
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          className="product-card__img"
          loading="lazy"
        />
        <div className="product-card__overlay" onClick={handleAddToCart}>
          <BsCartPlus />
          ADD TO CART
        </div>
        <button
          className="product-card__mob-add-btn"
          onClick={handleAddToCart}
          title="Add to Cart"
        >
          <BsCartPlus />
        </button>
      </div>

      <div className="product-card__body">
        {product.brand && (
          <span className="product-card__brand">{product.brand}</span>
        )}
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__price">
          {product?.price?.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
