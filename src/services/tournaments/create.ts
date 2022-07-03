import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

import { Tournament } from "./common";

export const createTournamentParams = z.object({
  "tournament[name]": z.string().min(3),
  "tournament[tournament_type]": z.enum([
    "single elimination",
    "double elimination",
    "round robin",
    "swiss",
  ]),
  "tournament[description]": z.string().min(3),
  "tournament[open_signup]": z.boolean().default(true),
});

export type CreateTournamentParams = z.infer<typeof createTournamentParams>;

export const create = async (params?: CreateTournamentParams) => {
  const response = await clientApi.post<Tournament>(
    clientRoutes.tournaments.create,
    params
  );
  return response.data;
};
