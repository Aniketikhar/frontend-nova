import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import "./Categories.css";

const CATEGORY_META = {
  mobiles:    { emoji: "📱", gradient: "linear-gradient(135deg, #667eea, #764ba2)", desc: "Smartphones & More" },
  laptops:    { emoji: "💻", gradient: "linear-gradient(135deg, #f093fb, #f5576c)", desc: "Work & Play" },
  tvs:        { emoji: "📺", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", desc: "Big Screen Entertainment" },
  headphones: { emoji: "🎧", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)", desc: "Immersive Audio" },
  watches:    { emoji: "⌚", gradient: "linear-gradient(135deg, #fa709a, #fee140)", desc: "Smart & Stylish" },
};

const DEFAULT_GRADIENT = "linear-gradient(135deg, #a18cd1, #fbc2eb)";
const DEFAULT_DESC = "Explore Products";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories — NovaShop">
      <div className="categories-page">
        {/* Hero Header */}
        <div className="categories-hero">
          <h1 className="categories-hero__title">Shop by Category</h1>
          <p className="categories-hero__sub">
            Explore our curated selection across all product categories
          </p>
        </div>

        {/* Category Grid */}
        <div className="container categories-grid-wrap">
          <div className="categories-grid">
            {categories.map((c) => {
              const meta = CATEGORY_META[c.slug] || {};
              return (
                <Link
                  to={`/category/${c.slug}`}
                  className="cat-card"
                  key={c._id}
                  style={{ "--cat-gradient": meta.gradient || DEFAULT_GRADIENT }}
                >
                  <div className="cat-card__bg" />
                  <div className="cat-card__emoji">{meta.emoji || "🛍️"}</div>
                  <h3 className="cat-card__name">{c.name}</h3>
                  <p className="cat-card__desc">{meta.desc || DEFAULT_DESC}</p>
                  <span className="cat-card__arrow">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;