import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Add Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          Manage Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
          Products
        </NavLink>
        {/* <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink> */}
      </div>
    </>
  );
};

export default AdminMenu;
