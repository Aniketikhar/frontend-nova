import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4 pb-5">
            {values?.results.map((p) => (
              <div className="card m-2  text-center px-3" style={{ width: "12rem" }}>
                <a onClick={() => navigate(`/product/${p.slug}`)} style={{cursor: "pointer"}}>

                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top pt-1"
                  style={{height: '250px', maxWidth: "100%" , maxHeight: "250px" , objectFit: 'contain'}}

                  alt={p.name}
                />
                <div className="card-body">
                  <h6 className="card-title">{p.name.substring(0, 20)}</h6>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">{p?.price?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}</p>
                  {/* <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">ADD TO CART</button> */}
                </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;