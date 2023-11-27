import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}`,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiClient;
