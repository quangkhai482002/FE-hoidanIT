import axios from "axios";

const registerNewUser = (email, password) => {
  return axios.post("http://localhost:5000/api/v1/register", {
    email,
    password,
  });
};
const loginUser = (email, password) => {
  return axios.post("http://localhost:5000/api/v1/login", {
    email,
    password,
  });
};
// const fetchAllUsers = (page, limit) => {
//   return axios.get(
//     `http://localhost:5000/api/v1/user/read?page=${page}&limit=${limit}`
//   );
// };
const fetchAllUsers = () => {
  return axios.get("http://localhost:5000/api/v1/user/read");
};
const deleteUsers = (user) => {
  return axios.delete("http://localhost:5000/api/v1/user/delete", {
    data: { id: user.id },
  });
};
const fetchGroup = () => {
  return axios.get("http://localhost:5000/api/v1/group/read");
};
const createNewUser = (data) => {
  return axios.post("http://localhost:5000/api/v1/user/create", { ...data });
};
export {
  registerNewUser,
  loginUser,
  fetchAllUsers,
  deleteUsers,
  fetchGroup,
  createNewUser,
};
