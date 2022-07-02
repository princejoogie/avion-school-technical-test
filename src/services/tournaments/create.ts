import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

import { Tournament } from "./common";

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

export const create = async (params?: CreateTournamentParams) => {
  const response = await clientApi.post<Tournament>(
    clientRoutes.tournaments.create,
    params
  );
  return response.data;
};
