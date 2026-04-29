import axios from "axios";

const client = axios.create({
  baseURL: "https://shopping-api-server.onrender.com",
  timeout: 10000,
});

export default client;
