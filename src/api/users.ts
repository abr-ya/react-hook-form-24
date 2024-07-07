import axios from "axios";

export const usersApi = axios.create({
  baseURL: "http://localhost:8080/", // todo: move to .env
});
