import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import img from "../assets/images/signup.jpg";
import { RiAccountBoxFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cPassword: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cPassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email,
        phone,
        work,
        password,
        cPassword,
      }),
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      alert("Invalid Registration");
      console.log("Registration Failed");
    } else {
      alert("Registration Successful");
      console.log("Registration Success");
      history.push("/login");
    }
  };
  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
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
              <img src={img} alt="photu" style={{ borderRadius: "20px" }} />
            </div>
            <div className="signup-form">
              <h2 className="form-title ">Sign Up</h2>
              <form id="register-form" className="register-form" method="POST">
                <div className="form-group">
                  <label htmlFor="name">
                    <p>
                      <RiAccountBoxFill />
                    </p>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                  />
                </div>
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
                    autoComplete="off"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Phone No.">
                    <p>
                      <AiOutlinePhone />
                    </p>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="Phone No."
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="Your Phone No."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="work">
                    <p>
                      <MdWork />
                    </p>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    autoComplete="off"
                    value={user.work}
                    onChange={handleChange}
                    placeholder="Your work"
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
                    autoComplete="off"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Your password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cPassword">
                    <p>
                      <RiLockPasswordLine />
                    </p>
                  </label>
                  <input
                    type="text"
                    name="cPassword"
                    id="cPassword"
                    autoComplete="off"
                    value={user.cPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="form-group form-button">
                  <button
                    type="submit"
                    name="signup"
                    id="signup"
                    className="btn btn-outline-dark text-center"
                    style={{ margin: "0rem 1rem" }}
                    onClick={handleSubmit}
                  >
                    Register
                  </button>
                  <h6>
                    <NavLink to="/login">Already Registered ?</NavLink>
                  </h6>
                </div>
                <div className="mb-5"></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
