import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
})

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api
