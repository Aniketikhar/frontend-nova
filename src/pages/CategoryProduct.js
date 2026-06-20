import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";
import { SkeletonGrid } from "../components/SkeletonCard/SkeletonCard";
import "./CategoryProduct.css";

const SORT_OPTIONS = [
  { label: "Relevant",       value: "default"     },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc"},
  { label: "Name: A → Z",    value: "name_asc"    },
];

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts]   = useState([]);
  const [category, setCategory]   = useState({});
  const [loading, setLoading]     = useState(false);
  const [sort, setSort]           = useState("default");

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
      setLoading(false);
    }
  };

  const sortedProducts = () => {
    const list = [...(products || [])];
    switch (sort) {
      case "price_asc":  return list.sort((a, b) => a.price - b.price);
      case "price_desc": return list.sort((a, b) => b.price - a.price);
      case "name_asc":   return list.sort((a, b) => a.name.localeCompare(b.name));
      default:           return list;
    }
  };

  const CATEGORY_EMOJI = {
    mobiles: "📱", laptops: "💻", tvs: "📺", headphones: "🎧", watches: "⌚",
  };

  return (
    <Layout title={`${category?.name || "Category"} — NovaShop`}>
      {/* Hero */}
      <div className="cat-page-hero">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="cat-breadcrumb" aria-label="breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <a href="/categories">Categories</a>
            <span>›</span>
            <span className="active">{category?.name}</span>
          </nav>

          <div className="cat-page-hero__content">
            <span className="cat-page-hero__emoji">
              {CATEGORY_EMOJI[params?.slug] || "🛍️"}
            </span>
            <div>
              <h1 className="cat-page-hero__title">{category?.name}</h1>
              <span className="cat-page-hero__count">
                {products?.length} {products?.length === 1 ? "product" : "products"} found
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container cat-page-body">
        {/* Sort Bar */}
        <div className="sort-bar">
          <span className="sort-bar__label">Sort by:</span>
          <div className="sort-bar__options">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`sort-btn ${sort === opt.value ? "active" : ""}`}
                onClick={() => setSort(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <SkeletonGrid count={8} />
        ) : products?.length > 0 ? (
          <div className="product-grid">
            {sortedProducts().map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="cat-empty">
            <span className="cat-empty__icon">🔍</span>
            <h3>No Products Found</h3>
            <p>We couldn't find any products in this category.</p>
            <a href="/" className="btn-nova-primary" style={{ display:"inline-block", marginTop:"16px" }}>
              Browse All Products
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
