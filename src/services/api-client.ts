import axios from "axios";
import { ZodSchema, z } from "zod";

export const apiClient = axios.create({
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

export const validateParams =
  <T extends ZodSchema>(paramSchema: T) =>
  <K = any>(data: K): z.infer<T> => {
    const values = paramSchema.parse(data);
    return values;
  };
