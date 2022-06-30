import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { clientRoutes, clientApi } from "../api-base";

export const tournamentParameters = z
  .object({
    state: z.enum(["all", "pending", "in_progress", "complete"]).optional(),
    type: z
      .enum([
        "single_elimination",
        "double_elimination",
        "round_robin",
        "swiss",
      ])
      .optional(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    subdomain: z.string().optional(),
  })
  .optional();

export type TournamentParameters = z.infer<typeof tournamentParameters>;

export const tournamentOutput = z.array(
  z.object({
    tournament: z.object({
      created_at: z.string(),
      description: z.string(),
      full_challonge_url: z.string().url(),
      game_name: z.string(),
      id: z.number(),
      live_image_url: z.string().url(),
      name: z.string(),
      state: z.enum(["all", "pending", "in_progress", "complete"]),
      updated_at: z.string(),
      url: z.string(),
    }),
  })
);

export type Tournaments = z.infer<typeof tournamentOutput>;

export const getAll = async (params?: TournamentParameters) => {
  try {
    const response = await clientApi.get<Tournaments>(
      clientRoutes.tournaments,
      { params }
    );
    return response.data;
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(e.message);
    }

    if (e instanceof AxiosError) {
      throw new Error(e.message);
    }

    throw e;
  }
};
