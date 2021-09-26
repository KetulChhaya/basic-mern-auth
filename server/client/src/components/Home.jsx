import React, { useEffect, useState } from "react";

const Home = () => {
  let flag = 0;
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const getHomePageInfo = async () => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (!data) {
      console.log("NO Data Obtained");
    } else {
      setUserData(data);
      setShow(true);
      // console.log(data);
    }
  };
  useEffect(() => {
    getHomePageInfo();
  }, []);
  return (
    <div className="text-center home-section">
      <div className="home-div">
        <p className="pt-5">Welcome</p>
        <div className="border-line"></div>
        <h2 className="fw-bold text-uppercase   ">{userData.name}</h2>

        {!show ? (
          <h4>
            We are the{" "}
            <span
              style={{
                fontWeight: 650,
                color: "navy",
                fontFamily: "monospace",
              }}
            >
              MERN
            </span>{" "}
            Developer
          </h4>
        ) : (
          <h4>Happy to see you back!!!</h4>
        )}
      </div>
    </div>
  );
};

export default Home;
