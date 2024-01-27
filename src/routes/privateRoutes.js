import React, { useEffect } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
const PrivateRoutes = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
      window.location.reload();
    }
  }, []);
  return (
    // <>
    <Routes>
      <Route path={props.path} element={props.element} />
    </Routes>
    // </>
  );
};
export default PrivateRoutes;
