import axios from 'axios';

const httpService = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

httpService.interceptors.request.use((config) => {
  const token = null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

httpService.interceptors.response.use((response) => response.data, (error) => {
  if (error.response) {
    const customError = new Error('Error on request')
    customError.response = error.response
    switch (error.response.status) {
      case 401:
        customError.message = 'Unauthorized'
        break;
      default:
        customError.message = 'Error on request'
    }
    throw customError
  } else {
    // Request error
  }
  return Promise.reject(error);
})

export default httpService