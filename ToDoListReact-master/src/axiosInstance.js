import axios from 'axios';

// קבע את ה-API URL בהתאם לסביבה
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5245'
  : 'https://todolist-fullstack-practicode4.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
