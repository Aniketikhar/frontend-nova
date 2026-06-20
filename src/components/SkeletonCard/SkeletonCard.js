import React from "react";
import "./SkeletonCard.css";

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-img skeleton-shimmer" />
    <div className="skeleton-body">
      <div className="skeleton-line skeleton-shimmer short" />
      <div className="skeleton-line skeleton-shimmer" />
      <div className="skeleton-line skeleton-shimmer medium" />
      <div className="skeleton-price skeleton-shimmer" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 5 }) => (
  <div className="product-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
