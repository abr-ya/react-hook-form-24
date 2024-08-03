import axios from "axios";

export const usersApi = axios.create({
  baseURL: import.meta.env.VITE_USERS_API ?? "http://localhost:8080/",
});
