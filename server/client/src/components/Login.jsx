import React, { useContext, useState } from "react";
import loginPic from "../assets/images/login.jpg";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 422 || !data) {
      alert("Invalid Credentials");
      console.log("Invalid");
    } else {
      dispatch({ type: "USER", payload: true });
      alert("Login Successful");
      history.push("/");
    }
  };
  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title ">Sign In</h2>
              <form id="register-form" className="register-form" method="POST">
                <div className="form-group">
                  <label htmlFor="email">
                    <p>
                      <HiOutlineMail />
                    </p>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <p>
                      <RiLockPasswordLine />
                    </p>
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Your password"
                  />
                </div>
                <div className="form-group form-button">
                  <button
                    type="submit"
                    name="signin"
                    id="signin"
                    className="btn btn-outline-dark text-center"
                    style={{ margin: "0rem 2rem" }}
                    onClick={loginUser}
                  >
                    Sign In
                  </button>
                  <h6>
                    <NavLink to="/signup">Create Account</NavLink>
                  </h6>
                </div>
                <div className="mb-5"></div>
              </form>
            </div>
            <div
              className="img-con"
              style={{
                maxHeight: "85vh",
                padding: "0rem 2rem",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={loginPic}
                alt="photu"
                style={{ borderRadius: "20px" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
