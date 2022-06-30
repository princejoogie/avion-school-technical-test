/* eslint-disable no-console */
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

import { ErrorData } from "@/types";

export const createTournamentParams = z
  .object({
    "tournament[name]": z.string(),
    "tournament[tournament_type]": z.string(),
    "tournament[url]": z.string().optional(),
    "tournament[description]": z.string(),
    "tournament[open_signup]": z.boolean(),
  })
  .optional();

export type CreateTournamentParams = z.infer<typeof createTournamentParams>;

export const createTournamentResponse = z.object({
  tournament: z
    .object({
      created_at: z.string(),
      description: z.string(),
      game_id: z.number().nullable(),
      id: z.number(),
      name: z.string(),
      state: z.enum(["all", "pending", "in_progress", "complete"]),
      updated_at: z.string(),
      url: z.string(),
      // TODO: add more fields
    })
    // remove this if you want to strip out unknown properties
    .passthrough(),
});

export type CreateTournamentResponse = z.infer<typeof createTournamentResponse>;

export const create = async (params?: CreateTournamentParams) => {
  try {
    const response = await clientApi.post<CreateTournamentResponse>(
      clientRoutes.tournaments.create,
      params
    );
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data as ErrorData;
      toast.error(error.message);
      console.error(e);
      return [];
    }

    const error = e as any;
    toast.error(`${error.message}`);
    console.error(e);
    return [];
  }
};
