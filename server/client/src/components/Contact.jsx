import React, { useState, useEffect } from "react";
import { FaPhoneAlt, MdEmail, FaAddressCard } from "react-icons/all";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });
  const getContactDetails = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      // console.log(userData);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactDetails();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, msg } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        msg,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("Message Not Sent");
    } else {
      alert("Message Send Successfully");
      // setUserData({ ...userData, msg: "" });
    }
  };
  return (
    <>
      <div className="contact-info">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="contact-info-item item-1">
                <div className="icon">
                  <FaPhoneAlt size="1.8em" color="#fff" />
                </div>
                <div className="content-info-content">
                  <div className="contact-info-title">
                    <h6>Phone</h6>
                  </div>
                  <div className="contact-info-text">
                    <h6>5252552</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info-item item-2">
                <div className="icon">
                  <MdEmail size="2em" color="#fff" />
                </div>
                <div className="content-info-content">
                  <div className="contact-info-title">
                    <h6>Email</h6>
                  </div>
                  <div className="contact-info-text">
                    <h6>mern@info.com</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info-item item-3">
                <div className="icon">
                  <FaAddressCard size="2em" color="#fff" />
                </div>
                <div className="content-info-content">
                  <div className="contact-info-title">
                    <h6>Address</h6>
                  </div>
                  <div className="contact-info-text">
                    <h6>XyZ Street, ABC City, USA</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <div className="contact-us-con py-2">
                    <div
                      className="contact-form-title"
                      style={{ color: "#000" }}
                    >
                      <h3>Get in Touch</h3>
                    </div>
                    <form id="contact-form" method="POST">
                      <div className="form-body">
                        <div className="form-div d-flex justify-content-between align-items-between">
                          <input
                            type="text"
                            id="form-name"
                            className="form-name input-field"
                            value={userData.name}
                            name="name"
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                          />
                          <input
                            type="email"
                            id="form-email"
                            className="form-name input-field"
                            value={userData.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                          />
                          <input
                            type="number"
                            id="form-number"
                            className="form-name input-field"
                            value={userData.phone}
                            name="phone"
                            onChange={handleChange}
                            placeholder="Your Number"
                            required
                          />
                        </div>
                        <div className="contact-form-text">
                          <textarea
                            name="msg"
                            id=""
                            cols="30"
                            rows="10"
                            value={userData.msg}
                            onChange={handleChange}
                            placeholder="Type a  Message here"
                            style={{ padding: ".5rem 0rem ", width: "100%" }}
                          ></textarea>
                        </div>
                        <div className="contact-form-btn">
                          <button
                            type="submit"
                            name="signin"
                            id="signin"
                            className="btn btn-outline-dark text-center"
                            style={{ margin: "1rem 0rem" }}
                            onClick={handleSubmit}
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
