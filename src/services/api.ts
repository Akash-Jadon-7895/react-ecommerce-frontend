import axios from "axios"

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000/api"
  : "https://react-ecommerce-backend-o6ih.onrender.com/api";


export const api = axios.create({
  baseURL: BASE_URL,
})
