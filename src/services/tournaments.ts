import { z } from "zod";

import { clientRoutes, clientApi } from "./api-base";

export const tournamentParameters = z
  .object({
    state: z.string().optional(),
    type: z.string().optional(),
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
      id: z.number(),
      name: z.string(),
      state: z.string(),
      updated_at: z.string(),
      url: z.string(),
    }),
  })
);

export type Tournaments = z.infer<typeof tournamentOutput>;

export const getTournaments = async (params?: TournamentParameters) => {
  try {
    const response = await clientApi.get<Tournaments>(
      clientRoutes.tournaments,
      {
        params,
      }
    );
    return response.data;
  } catch (e) {
    const error = e as any;
    throw error.message;
  }
};
