import axios from "axios";
// import {} from "../appContext";
// Modify server url here
const baseURL = "http://localhost:4000";
// const baseURL = "http://192.168.2.106:4000";
// const baseURL = "https://app.freshio.me";
const request = axios.create({
  baseURL: baseURL,
  withCredentials: true, //允许携带cookie，后端必须设置跨域CORS规则，且不能用*
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.error(error);
    }
    // Customize error handling
    return Promise.reject(error);
  }
);

export default request;
