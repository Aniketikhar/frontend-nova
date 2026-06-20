import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import ProductCard from "../components/ProductCard/ProductCard";
import { SkeletonGrid } from "../components/SkeletonCard/SkeletonCard";
import "./Search.css";

const Search = () => {
  const { values, searchLoading } = useSearch();

  return (
    <Layout title="Search Results — NovaShop">
      <div className="search-page">
        <div className="container">
          {/* Header */}
          <div className="search-page__header">
            <h1 className="search-page__title">
              {values?.keyword ? (
                <>Search results for "<span>{values.keyword}</span>"</>
              ) : (
                "Search Results"
              )}
            </h1>
            {!searchLoading && (
              <span className="search-page__count">
                {values?.results?.length < 1
                  ? "No products found"
                  : `${values?.results?.length} product${values?.results?.length !== 1 ? "s" : ""} found`}
              </span>
            )}
          </div>

          {/* Results */}
          {searchLoading ? (
            <SkeletonGrid count={8} />
          ) : values?.results?.length < 1 ? (
            <div className="search-empty">
              <span className="search-empty__icon">🔍</span>
              <h2>No Products Found</h2>
              <p>
                We couldn't find anything for "{values?.keyword}". Try a different search term.
              </p>
              <a href="/" className="search-empty__cta">Browse All Products</a>
            </div>
          ) : (
            <div className="product-grid">
              {values?.results?.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
