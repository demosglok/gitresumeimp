import axios from 'axios';
import config from '@/config';
import router from '@/router'

const http = axios.create({
  baseURL: config.BACKEND_URL,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => Promise.resolve(response.data),
  (err) => {
    if(err && err.response) {
      if(err.response.status === 401 ||
        (err.response.data && err.response.data.error === 'Not authorized')) {
        router.replace('/home')
      }
    }
    return Promise.reject(err);
  });



export default http;
