import axios from 'axios';

const AxiosHelper = axios.create({});

AxiosHelper.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    config.headers['Authorization'] = `Bearer ${token}`;

    config.baseURL = process.env.REACT_APP_ORIGIN_BACKEND;
    return config;
  },
  (error) => Promise.reject(error),
);

AxiosHelper.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    // if (err.response) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //   console.log(err.response.data);
    //   console.log(err.response.status);
    //   console.log(err.response.headers);
    // } else if (err.request) {
    //   // The request was made but no response was received
    //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //   // http.ClientRequest in node.js
    //   console.log(err.request);
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   console.log("Error", err.message);
    // }
    /**
     * Token expired
     */
    if (err.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    if (process.env.NODE_ENV !== 'production') {
      console.error(err.toJSON());
    }
    return Promise.reject(err);
  },
);

export default AxiosHelper;
