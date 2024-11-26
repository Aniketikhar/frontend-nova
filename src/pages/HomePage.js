import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import "./HomePage.css";

// carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [tvproducts, setTVProducts] = useState([]);
  const [mobileproducts, setMobileProducts] = useState([]);
  const [laptopsproducts, setLaptopProducts] = useState([]);
  const [headphoneproducts, setHeadphoneProducts] = useState([]);
  const [watchesproducts, setWatchesProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get products by category TV

  const getProductByTV = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-tv`
      );
      setLoading(false);
      setTVProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //  get products by category mobiles

  const getProductByMobiles = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-mobiles`
      );
      setLoading(false);
      setMobileProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get products by category laptops

  const getProductsByLaptops = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-laptops`
      );
      setLoading(false);
      setLaptopProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get products by category headphone

  const getProductsByHeadphone = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-headphones`
      );
      setLoading(false);
      setHeadphoneProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //  get products by category watches

  const getProductsByWatch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-watches`
      );
      setLoading(false);
      setWatchesProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
      getProductByTV();
      getProductByMobiles();
      getProductsByLaptops();
      getProductsByHeadphone();
      getProductsByWatch();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // for making responsive carousel
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1028 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 756 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 756, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <Layout title={"All Products - Best offers "}>
        {/* this show all categories */}
        <div className="container-fluid category-container px-5 py-2 text-light ">
          <div class="container">
            <div className=" d-md-inline-block">
              All Categories
              {/* <Link className="dropdown-item" to={"/categories"}>
            </Link> */}
            </div>
            <ul className=" category-show d-inline-block p-0">
              {categories?.map((c) => (
                <li>
                  <Link className="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
       

        {loading ? (
          <div className="loaderWrap">
            <span className="loader"></span>
          </div>
        ) : (
          <>
           {/* carousel */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide carousel-slides"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={3}
              aria-label="Slide 4"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <Link
                className="dropdown-item"
                to={`/product/Samsung-Galaxy-F55-5G`}
              >
                <img
                  src="images/banner11.webp"
                  className="d-block slide-img w-100"
                  alt="..."
                />
              </Link>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <Link
                className="dropdown-item"
                to={`/product/Motorola-Edge-50-Pro-5G`}
              >
                <img
                  src="images/carousel-2.jpg"
                  className="d-block slide-img w-100"
                  alt="..."
                />
              </Link>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <Link
                className="dropdown-item"
                to={`/product/Motorola-Edge-50-Fusion-(Marshmallow-Blue-128-GB)-(8-GB-RAM)JustHere`}
              >
                <img
                  src="images/banner12.webp"
                  className="d-block slide-img w-100"
                  alt="..."
                />
              </Link>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <Link
                className="dropdown-item"
                to={`/product/Poco-F6-5G-(12GB-RAM-+256GB)`}
              >
                <img
                  src="images/banner13.webp"
                  className="d-block slide-img w-100"
                  alt="..."
                />
              </Link>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* products by category mobiles */}
            <div className="container my-5 rounded-4 bg-body-tertiary">
              <Link className="dropdown-item" to={`/category/mobiles`}>
                <h3 className=" mobile pt-4 ms-4">Mobiles</h3>
              </Link>
              <Carousel responsive={responsive}>
                {mobileproducts?.map((p) => (
                  <div className="card m-2 text-center shadow product">
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
                ))}
              </Carousel>
            </div>

            {/* products by category TV */}
            <div className="container my-5 bg-body-tertiary rounded-4 ">
              <Link className="dropdown-item" to={`/category/tvs`}>
                <h3 className="pt-4 ps-4">TVs</h3>
              </Link>
              <Carousel responsive={responsive}>
                {tvproducts?.map((p) => (
                  <div
                    className="card m-2 text-center shadow"
                    style={{ width: "12rem" }}
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
                ))}
              </Carousel>
            </div>

            {/* products by category laptops */}
            <div className="container my-5 bg-body-tertiary rounded-4 ">
              <Link className="dropdown-item" to={`/category/laptops`}>
                <h3 className="ps-4 pt-4">Laptops</h3>
              </Link>
              <Carousel responsive={responsive}>
                {laptopsproducts?.map((p) => (
                  <div
                    className="card m-2 text-center shadow"
                    style={{ width: "12rem" }}
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
                ))}
              </Carousel>
            </div>

            {/* products by category Headphones */}
            <div className="container my-5 bg-body-tertiary rounded-4">
              <Link className="dropdown-item" to={`/category/headphones`}>
                <h3 className="ps-4 pt-4">Headphones</h3>
              </Link>
              <Carousel responsive={responsive}>
                {headphoneproducts?.map((p) => (
                  <div
                    className="card m-2 text-center shadow"
                    style={{ width: "12rem" }}
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
                ))}
              </Carousel>
            </div>

            {/* product by watches */}
            <div className="container my-5 bg-body-tertiary rounded-4">
              <Link className="dropdown-item" to={`/category/watches`}>
                <h3 className="ps-4 pt-4">Watches</h3>
              </Link>
              <Carousel responsive={responsive}>
                {watchesproducts?.map((p) => (
                  <div
                    className="card m-2 text-center shadow"
                    style={{ width: "12rem" }}
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
                ))}
              </Carousel>
            </div>

            {/* All products */}
            <div className="container">
              <h1 className="text-center all ">All Product</h1>

              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div
                    className="card all-product m-2 text-center shadow"
                    style={{ width: "12rem" }}
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
                ))}
              </div>
              <div className="m-2 p-3">
                {products && products.length < total && (
                  <button
                    className="btn text-dark btn-warning"
                    // style={{ background: "orangered" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading ..." : "Loadmore"}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default HomePage;
