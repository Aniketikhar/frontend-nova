import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { BsCartPlus } from "react-icons/bs";
import ProductCard from "../components/ProductCard/ProductCard";
import { SkeletonGrid } from "../components/SkeletonCard/SkeletonCard";
import "./ProductDetails.css";

const splitDescription = (description) =>
  description
    .split(".")
    .map((p) => p.trim())
    .filter((p) => p.length > 3);

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [points, setPoints] = useState([]);
  const [proLoading, setProloading] = useState(false);
  const [simiLoading, setSimiloading] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      setProloading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setProloading(false);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      if (data?.product?.description) {
        setPoints(splitDescription(data.product.description));
      }
    } catch (error) {
      console.log(error);
      setProloading(false);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      setSimiloading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
      setSimiloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    // Add qty copies (or merge if already in cart)
    const toAdd = Array(qty).fill(product);
    const updatedCart = [...cart, ...toAdd];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${qty} item${qty > 1 ? "s" : ""} added to cart!`);
  };

  return (
    <Layout title={product?.name ? `${product.name} — NovaShop` : "Product — NovaShop"}>
      <div className="product-detail-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="pd-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            {product?.category && (
              <>
                <Link to={`/category/${product.category.slug}`}>{product.category.name}</Link>
                <span>›</span>
              </>
            )}
            <span className="current">{product?.name?.substring(0, 40)}</span>
          </nav>

          {/* Main layout */}
          <div className="row g-4 g-md-5">
            {/* Image */}
            <div className="col-12 col-md-5">
              <div className="pd-img-wrap">
                {proLoading ? (
                  <div className="loaderWrap"><span className="loader" /></div>
                ) : (
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="pd-img"
                    alt={product.name}
                    title="Click to zoom"
                  />
                )}
              </div>
            </div>

            {/* Info */}
            <div className="col-12 col-md-7">
              {proLoading ? (
                <div className="loaderWrap"><span className="loader" /></div>
              ) : (
                <div className="pd-info">
                  {product.brand && <span className="pd-brand">{product.brand}</span>}
                  <h1 className="pd-name">{product.name}</h1>

                  {/* Badges */}
                  <div className="pd-badges">
                    <span className="pd-badge instock">✓ In Stock</span>
                    <span className="pd-badge free-ship">🚚 Free Shipping</span>
                  </div>

                  {/* Price */}
                  <p className="pd-price">
                    {product?.price?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                  <p className="pd-price-sub">Inclusive of all taxes</p>

                  {/* Qty + Cart */}
                  <div className="pd-actions">
                    <div className="qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >−</button>
                      <span className="qty-value">{qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => setQty((q) => q + 1)}
                      >+</button>
                    </div>
                    <button className="pd-add-btn" onClick={handleAddToCart}>
                      <BsCartPlus size={20} />
                      ADD TO CART
                    </button>
                  </div>

                  {/* Delivery address */}
                  {auth?.user?.address && (
                    <div className="pd-delivery">
                      <span className="pd-delivery__icon">📦</span>
                      <div>
                        <p className="pd-delivery__label">Deliver to</p>
                        <p className="pd-delivery__addr">{auth.user.address}</p>
                        <Link to="/dashboard/user/profile" className="pd-delivery__change">
                          Change address
                        </Link>
                      </div>
                    </div>
                  )}

                  <hr className="pd-divider" />

                  {/* Features */}
                  {points.length > 0 && (
                    <>
                      <h3 className="pd-features-title">Features & Details</h3>
                      <ul className="pd-features-list">
                        {points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="related-section">
            <h2 className="related-title">Similar Products</h2>
            {simiLoading ? (
              <SkeletonGrid count={5} />
            ) : relatedProducts.length < 1 ? (
              <p className="related-empty">No similar products found.</p>
            ) : (
              <div className="product-grid">
                {relatedProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
