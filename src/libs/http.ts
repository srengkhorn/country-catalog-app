import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1/",
  headers: {
    "Content-type": "application/json",
  },
});
