import { Route, Switch, Routes } from "react-router-dom";
import Login from "../components/login/login";
import Register from "../components/register/register";
import Users from "../components/manageUsers/user";
import PrivateRoutes from "./privateRoutes";

const AppRoutes = (props) => {
  return (
    <>
      <Routes>
        {/* private routes */}
        {/* <Route
          path="/users"
          element={<PrivateRoutes path="/users" element={<Users />} />}
        ></Route> */}
        {/* <Route
          path="/projects"
          element={<PrivateRoutes path="/projects" element={<Project />} />}
        ></Route> */}

        {/* ==================== */}

        {/* navigate public */}
        <Route path="/">Home</Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/new">New</Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="*">Not Found</Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
