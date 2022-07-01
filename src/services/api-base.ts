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

export const serverRoutes = Object.freeze({
  tournaments: {
    getAll: "/tournaments.json",
    create: "/tournaments.json",
    delete: (id: string) => `/tournaments/${id}.json`,
    getById: (id: string) => `/tournaments/${id}.json`,
    participants: {
      getAll: (tournamentId: string) =>
        `/tournaments/${tournamentId}/participants.json`,
    },
  },
});

export const clientApi = axios.create({
  baseURL: "/api",
});

export const clientRoutes = Object.freeze({
  tournaments: {
    getAll: "/tournaments",
    create: "/tournaments",
    delete: (id: string) => `/tournaments/${id}`,
    getById: (id: string) => `/tournaments/${id}`,
    participants: {
      getAll: (tournamentId: string) =>
        `/tournaments/${tournamentId}/participants`,
    },
  },
});
