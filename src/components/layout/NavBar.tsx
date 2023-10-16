import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div>
        <p className="brand">brand</p>
      </div>
      <div>
        <ul className="links">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/cart"}
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
