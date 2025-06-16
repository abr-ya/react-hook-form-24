import axios from "axios";

export const blogApi = axios.create({
  baseURL: import.meta.env.VITE_BLOG_API ?? "http://localhost:3333/",
});
