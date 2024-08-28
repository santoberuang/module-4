import axios from "axios";

const API_URL = "http://localhost:3000/register"; // Replace with your actual API endpoint

const registerAuth = (userData) => {
  return axios.post(API_URL, userData);
};

export default {
  registerAuth,
};
