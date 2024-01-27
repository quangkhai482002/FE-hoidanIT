import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./navi.scss";
const Navi = (prop) => {
  const [isShow, setIsShow] = useState(true);
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setIsShow(false);
    }
  }, []);
  return (
    <>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/new">New</NavLink>
          <NavLink to="/users">User</NavLink>
          {/* <a href="/About">About</a> */}
        </div>
      )}
    </>
  );
};

export default Navi;
