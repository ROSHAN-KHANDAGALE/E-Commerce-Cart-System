import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001/mern",
});

export default api;
