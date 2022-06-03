import axios from "axios";

export default axios.create({
  baseURL: "https://ecommercebackend34.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});