import React, { useEffect, useContext } from "react";
import { Route, useNavigate, Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const PrivateRoutes = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  let session = {};
  useEffect(() => {
    console.log("user", user);
    session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
      // window.location.reload();
    }
  }, []);
  return session ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
