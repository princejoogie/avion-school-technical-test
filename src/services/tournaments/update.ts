import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

import { Tournament } from "./common";

export const udpateTournamentParams = z.object({
  tournamentId: z.string(),
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

export type UpdateTournamentParams = z.infer<typeof udpateTournamentParams>;

export const update = async (params: UpdateTournamentParams) => {
  const response = await clientApi.put<Tournament>(
    clientRoutes.tournaments.update(params.tournamentId),
    params
  );
  return response.data;
};
