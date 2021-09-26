import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-page-section">
        <div className="error-text">
          <div className="large-text back-text">4 0 4</div>
          <h1 className="h1 white-text text-uppercase front-text">
            You're Lost !
          </h1>
        </div>

        <div className="error-desc text-center">
          <p>
            Sorry ! but the page you are looking for does not exist, have been
            removed, name changed or is temporarily unavailable
          </p>
        </div>
        <div className="contact-form-btn  d-flex justify-content-center">
          <NavLink to="/">
            <button
              type="submit"
              name="signin"
              id="signin"
              className="btn btn-outline-light text-center"
              style={{ margin: "1rem 0rem" }}
            >
              Home Page
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
