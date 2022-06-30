/* eslint-disable no-console */
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

import { ErrorData } from "@/types";

export const getByIdParams = z.object({
  tournamentId: z.string(),
  includeParticipants: z.boolean().default(true).optional(),
  includeMatches: z.boolean().default(true).optional(),
});

export type GetByIdParams = z.infer<typeof getByIdParams>;

export const getByIdResponse = z.object({
  tournament: z
    .object({
      created_at: z.string(),
      description: z.string(),
      full_challonge_url: z.string().url(),
      game_name: z.string().nullable(),
      id: z.number(),
      live_image_url: z.string().url(),
      name: z.string(),
      state: z.enum([
        "all",
        "pending",
        "underway",
        "complete",
        "awaiting_review",
      ]),
      updated_at: z.string(),
      url: z.string(),
      participants_count: z.number(),
      completed_at: z.string().nullable(),
      tournament_type: z.string(),
      // TODO: add more fields
    })
    // remove this if you want to strip out unknown properties
    .passthrough(),
});

export type Tournaments = z.infer<typeof getByIdResponse>;

export const getById = async (params: GetByIdParams) => {
  const { tournamentId } = params;
  try {
    const response = await clientApi.get<Tournaments>(
      clientRoutes.tournaments.getById(tournamentId),
      { params }
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
