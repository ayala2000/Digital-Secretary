import axios from 'axios';

import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:3000/', // Your base API URL
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
});

export default api;