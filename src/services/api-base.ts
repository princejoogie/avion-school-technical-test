import axios from "axios";

export const serverApi = axios.create({
  baseURL: "https://api.challonge.com/v1",
  params: {
    api_key: process.env.NEXT_PUBLIC_CHALLONGE_API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: "https://challonge.com",
  },
});

export const serverRoutes = {
  tournaments: "/tournaments.json",
};

export const clientApi = axios.create({
  baseURL: "/api",
});

export const clientRoutes = {
  tournaments: "/tournaments",
};