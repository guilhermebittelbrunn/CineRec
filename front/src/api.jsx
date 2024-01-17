import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:4141/api',
})

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.clear('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default api