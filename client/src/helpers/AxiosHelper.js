import axios from "axios";

const AxiosHelper = new axios.create({
  baseURL: "http://localhost:1223",
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
});

AxiosHelper.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    if (err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    if (process.env.NODE_ENV !== "production") {
      console.error(err.toJSON());
    }
    return Promise.reject(err);
  }
);

export default AxiosHelper;
