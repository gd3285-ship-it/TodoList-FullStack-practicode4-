import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5245"
});

export default axiosInstance;
