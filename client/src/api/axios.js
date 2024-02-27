import axios from "axios";

// const defaultURL = "https://masteriseland-24c21-default-rtdb.firebaseio.com/";
const defaultURL = "http://localhost:8080/";
const baseUrl = axios.create({
  baseURL: defaultURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseUrl;
