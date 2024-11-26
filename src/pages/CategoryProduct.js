import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto pt-3 pb-5">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap">
              {loading ? (
                <div className="loaderWrap">
                  <span className="loader"></span>
                </div>
              ) : (
                products?.map((p) => (
                  <div
                    className="card m-1 text-center shadow"
                    style={{ width: "11rem" }}
                  >
                    <a
                      onClick={() => navigate(`/product/${p.slug}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top px-3 py-2"
                        style={{
                          height: "250px",
                          maxWidth: "100%",
                          maxHeight: "250px",
                          objectFit: "contain",
                        }}
                        alt={p.name}
                      />
                      <div className="card-body text-start">
                        <h6 className="card-title">
                          {p.name.substring(0, 32)}...
                        </h6>

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
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
