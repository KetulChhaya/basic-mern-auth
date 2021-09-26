import React, { useContext } from "react";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { UserContext } from "../App";
const Navbar = () => {
  const { state } = useContext(UserContext);
  const GenMenu = () => {
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/about">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/contact">
            Contact
          </NavLink>
        </li>
      </>
    );
  };
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <GenMenu />
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/logout">
              Logout
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <GenMenu />
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/signup">
              Register
            </NavLink>
          </li>
        </>
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          {/* MERN */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <RenderMenu />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
