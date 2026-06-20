import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";
import ProductCard from "../components/ProductCard/ProductCard";
import { SkeletonGrid } from "../components/SkeletonCard/SkeletonCard";

// carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CATEGORY_META = {
  mobiles:    { emoji: "📱", slug: "mobiles"    },
  tvs:        { emoji: "📺", slug: "tvs"        },
  laptops:    { emoji: "💻", slug: "laptops"    },
  headphones: { emoji: "🎧", slug: "headphones" },
  watches:    { emoji: "⌚", slug: "watches"    },
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [tvproducts, setTVProducts] = useState([]);
  const [mobileproducts, setMobileProducts] = useState([]);
  const [laptopsproducts, setLaptopProducts] = useState([]);
  const [headphoneproducts, setHeadphoneProducts] = useState([]);
  const [watchesproducts, setWatchesProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked] = useState([]);
  const [radio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

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

  const getProductByTV = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-tv`
      );
      setTVProducts(data.products);
    } catch (error) { console.log(error); }
  };

  const getProductByMobiles = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-mobiles`
      );
      setMobileProducts(data.products);
    } catch (error) { console.log(error); }
  };

  const getProductsByLaptops = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-laptops`
      );
      setLaptopProducts(data.products);
    } catch (error) { console.log(error); }
  };

  const getProductsByHeadphone = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-headphones`
      );
      setHeadphoneProducts(data.products);
    } catch (error) { console.log(error); }
  };

  const getProductsByWatch = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/category-watches`
      );
      setWatchesProducts(data.products);
    } catch (error) { console.log(error); }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };



  useEffect(() => {
    if (!checked.length || !radio.length) {
      Promise.all([
        getAllProducts(),
        getProductByTV(),
        getProductByMobiles(),
        getProductsByLaptops(),
        getProductsByHeadphone(),
        getProductsByWatch(),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, { checked, radio });
      setProducts(data?.products);
    } catch (error) { console.log(error); }
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop:           { breakpoint: { max: 3000, min: 1028 }, items: 5 },
    tablet:            { breakpoint: { max: 1024, min: 640  }, items: 3 },
    mobile:            { breakpoint: { max: 640,  min: 0    }, items: 2 },
  };

  const CategorySection = ({ title, emoji, slug, products }) => (
    <div className="cat-section">
      <div className="cat-section__header">
        <Link className="cat-section__title" to={`/category/${slug}`}>
          <span className="cat-section__emoji">{emoji}</span>
          {title}
        </Link>
        <Link className="cat-section__see-all" to={`/category/${slug}`}>
          See All →
        </Link>
      </div>
      {products?.length > 0 ? (
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3500} removeArrowOnDeviceType={["mobile"]}>
          {products.map((p) => (
            <div key={p._id} style={{ padding: "4px 6px" }}>
              <ProductCard product={p} />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="product-grid">
          <SkeletonGrid count={5} />
        </div>
      )}
    </div>
  );

  return (
    <Layout title="NovaShop — Best Deals on Electronics">
      {/* Category Strip */}
      <div className="category-strip">
        <div className="container category-strip__inner">
          <span className="category-strip__label">Browse:</span>
          {categories?.map((c) => (
            <Link key={c._id} className="category-strip__item" to={`/category/${c.slug}`}>
              {CATEGORY_META[c.slug]?.emoji || "🛍️"} {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="container-fluid px-3 px-md-4">
        {/* Hero Carousel */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide carousel-slides"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {[0,1,2,3].map((i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3500">
              <Link to="/product/Samsung-Galaxy-F55-5G">
                <img src="images/banner11.webp" className="d-block slide-img w-100" alt="Samsung Galaxy F55" />
              </Link>
            </div>
            <div className="carousel-item" data-bs-interval="3500">
              <Link to="/product/Motorola-Edge-50-Pro-5G">
                <img src="images/carousel-2.jpg" className="d-block slide-img w-100" alt="Motorola Edge 50 Pro" />
              </Link>
            </div>
            <div className="carousel-item" data-bs-interval="3500">
              <Link to="/product/Motorola-Edge-50-Fusion-(Marshmallow-Blue-128-GB)-(8-GB-RAM)JustHere">
                <img src="images/banner12.webp" className="d-block slide-img w-100" alt="Motorola Edge 50 Fusion" />
              </Link>
            </div>
            <div className="carousel-item" data-bs-interval="3500">
              <Link to="/product/Poco-F6-5G-(12GB-RAM-+256GB)">
                <img src="images/banner13.webp" className="d-block slide-img w-100" alt="Poco F6 5G" />
              </Link>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" />
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" />
          </button>
        </div>

        {/* Trust Bar */}
        <div className="container trust-bar">
          <div className="trust-item">
            <span className="trust-icon">🚚</span>
            <div>
              <p className="trust-title">Free Shipping</p>
              <p className="trust-sub">On orders above ₹499</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <div>
              <p className="trust-title">Secure Payment</p>
              <p className="trust-sub">100% safe & protected</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">↩️</span>
            <div>
              <p className="trust-title">Easy Returns</p>
              <p className="trust-sub">7-day return policy</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🎧</span>
            <div>
              <p className="trust-title">24/7 Support</p>
              <p className="trust-sub">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        <CategorySection title="Mobiles"    emoji="📱" slug="mobiles"    products={mobileproducts}    />
        <CategorySection title="Televisions" emoji="📺" slug="tvs"        products={tvproducts}        />
        <CategorySection title="Laptops"    emoji="💻" slug="laptops"    products={laptopsproducts}   />
        <CategorySection title="Headphones" emoji="🎧" slug="headphones" products={headphoneproducts} />
        <CategorySection title="Watches"    emoji="⌚" slug="watches"    products={watchesproducts}   />

        {/* All Products */}
        <div className="all-section">
          <div className="all-section__header">
            <h2 className="all-section__title">All Products</h2>
          </div>

          {loading && products.length === 0 ? (
            <SkeletonGrid count={10} />
          ) : (
            <div className="product-grid">
              {products?.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

          <div className="loadmore-wrap">
            {products && products.length < total && (
              <button
                className="loadmore-btn"
                onClick={(e) => { e.preventDefault(); setPage(page + 1); }}
              >
                {loading ? "Loading..." : "Load More Products"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
