/* eslint-disable no-console */
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { ErrorData } from "@/types";

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
      create: (tournamentId: string) =>
        `/tournaments/${tournamentId}/participants.json`,
    },
  },
});

export const clientApi = axios.create({
  baseURL: "/api",
});

clientApi.interceptors.response.use(
  (config) => config,
  (e) => {
    if (e instanceof AxiosError) {
      const error = e.response?.data as ErrorData;
      toast.error(error.message);
      console.error(e);
      return Promise.reject(e);
    }

    const error = e as any;
    toast.error(`${error.message}`);
    console.error(e);
    return Promise.reject(e);
  }
);

export const clientRoutes = Object.freeze({
  tournaments: {
    getAll: "/tournaments",
    create: "/tournaments",
    delete: (id: string) => `/tournaments/${id}`,
    getById: (id: string) => `/tournaments/${id}`,
    participants: {
      getAll: (tournamentId: string) =>
        `/tournaments/${tournamentId}/participants`,
      create: (tournamentId: string) =>
        `/tournaments/${tournamentId}/participants`,
    },
  },
});
