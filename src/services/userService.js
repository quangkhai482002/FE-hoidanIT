import axios from "../setup/axios";

const registerNewUser = (email, password) => {
  return axios.post("/api/v1/register", {
    email,
    password,
  });
};
const loginUser = (email, password) => {
  return axios.post("/api/v1/login", {
    email,
    password,
  });
};
// const fetchAllUsers = (page, limit) => {
//   return axios.get(
//     `/api/v1/user/read?page=${page}&limit=${limit}`
//   );
// };
const fetchAllUsers = () => {
  return axios.get("/api/v1/user/read");
};
const deleteUsers = (user) => {
  return axios.delete("/api/v1/user/delete", {
    data: { id: user.id },
  });
};
const fetchGroup = () => {
  return axios.get("/api/v1/group/read");
};
const createNewUser = (data) => {
  return axios.post("/api/v1/user/create", { ...data });
};
const updateCurrentUser = (userData) => {
  return axios.put("/api/v1/user/update", { ...userData });
};
export {
  registerNewUser,
  loginUser,
  fetchAllUsers,
  deleteUsers,
  fetchGroup,
  createNewUser,
  updateCurrentUser,
};
