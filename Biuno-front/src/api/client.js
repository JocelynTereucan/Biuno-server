import axios from "axios";

export const api = axios.create({
  baseURL: "https://biuno-server.onrender.com", // o http://localhost:3000 si pruebas local
  headers: { "Content-Type": "application/json" },
});
