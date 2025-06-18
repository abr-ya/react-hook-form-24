import axios from "axios";

export const foodApi = axios.create({
  baseURL: import.meta.env.VITE_FOOD_API ?? "http://localhost:3333/",
});
