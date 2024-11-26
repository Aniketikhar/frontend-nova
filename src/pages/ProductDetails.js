import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { BsFillCartPlusFill } from "react-icons/bs";
import "./ProductDetails.css";

// Helper function to split the description string
const splitDescription = (description) => {
  // Split by period and filter out empty strings after trimming
  return description
    .split(".")
    .map((point) => point.trim())
    .filter((point) => point);
};

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [points, setPoints] = useState([]);
  const [proLoading, setProloading] = useState(false);
  const [simiLoading, setSimiloading] = useState(false);

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
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
        const formattedPoints = splitDescription(data.product.description);
        setPoints(formattedPoints);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
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

  return (
    <Layout>
      <div className="row container pt-5 mx-auto ">
        <div className="col-12 col-md-6  ">
          <div className="d-flex justify-content-center shadow py-5 rounded-3 bg-white">
            {proLoading ? (
              <div className="loaderWrap">
                <span className="loader"></span>
              </div>
            ) : (
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                className="img-fluid"
                style={{ maxHeight: "25rem" }}
                alt={product.name}
              />
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 ps-md-5 pt-5 pt-md-0 product-detail">
          {proLoading ? (
            <div className="loaderWrap">
              <span className="loader"></span>
            </div>
          ) : (
            <>
              <h5>{product.brand}</h5>
              <h3>{product.name}</h3>
              <h2>
                {product?.price?.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </h2>
              <button
                className="btn btn-warning rounded-0 ms-1 px-5 py-2 addtocart"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item added successfully");
                }}
              >
                <BsFillCartPlusFill /> ADD TO CART
              </button>

              <hr />
              <h4>Features & Details</h4>
              <ul>
                {points.map((point, index) => (
                  <li key={index} className="">
                    <h6>{point}</h6>
                  </li>
                ))}
              </ul>

              {auth?.user?.address && (
                <>
                  <hr />
                  <div className="mb-3">
                    <h4>Deliver to</h4>
                    <p>{auth?.user?.address}</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="container">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="container d-flex flex-wrap mx-auto">
          {proLoading ? (
            <div className="loaderWrap">
              <span className="loader"></span>
            </div>
          ) : (
            relatedProducts?.map((p) => (
              <div
                className="card m-2 text-center shadow"
                style={{ width: "12rem" }}
                key={p._id}
              >
                <a
                  onClick={() => navigate(`/product/${p.slug}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top px-3"
                    style={{
                      height: "250px",
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                    alt={p.name}
                  />
                  <div className="card-body text-start">
                    <h6 className="card-title">{p.name.substring(0, 32)}...</h6>
                    <p className="card-text fw-bold">
                      {p?.price?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
