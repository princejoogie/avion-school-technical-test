import { z } from "zod";

import { Match } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";

export const updateMatchParams = z.object({
  tournamentId: z.string(),
  matchId: z.string(),
  "match[scores_csv]": z.string(),
  "match[winner_id]": z.string().nullable(),
});

export type UpdateMatchParams = z.infer<typeof updateMatchParams>;

export const updateMatch = async (params: UpdateMatchParams) => {
  const response = await clientApi.put<Match>(
    clientRoutes.tournaments.matches.update(
      params.tournamentId,
      params.matchId
    ),
    params
  );
  return response.data;
};
