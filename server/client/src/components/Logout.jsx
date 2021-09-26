import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../App";
import Login from "./Login";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  //promises :: useEffect doesn't support async await
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        if (res.redirected) {
          return window.location.replace(res.url);
        }
        // history.push("/login", { replace: true });
        // if (res.status !== 200) {
        //   const error = new Error(res.error);
        //   throw error;
        // }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Login />
    </>
  );
};

export default Logout;
