import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";

const api = axios.create({
  baseURL: isDevelopment
    ? "http://localhost:5000/api"
    : "https://uob-forum-1.onrender.com",

  withCredentials: true,
});

export default api;

//This is a custom axios instance
//we call api as it comes with default settings we dont have to constantly define when stating an endpoint
// baseURL - says all requests using api start with this base URL
// withCredentials - says all requests using api should send cookies

//axios is like the inbuilt fetch HTTP request library vs axios thats 3rd party

//Axios
//Automatic - JSON parsing so no need for res.json() instead res.data
//Built in timeout of 5000ms
//has req and res interceptors
//axios.interceptors let you look at the request before it lands to .then or catch
