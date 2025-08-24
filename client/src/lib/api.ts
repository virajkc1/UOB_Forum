import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default api;

//This is a custom axios instance
//we call api as it comes with default settings we dont have to constantly define when stating an endpoint
// baseURL - says all requests using api start with this base URL
// withCredentials - says all requests using api should send cookies
