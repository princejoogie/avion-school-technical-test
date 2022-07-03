import { z } from "zod";

import { Match } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";

export const updateMatchParams = z.object({ tournamentId: z.string() });

export type UpdateMatchParams = z.infer<typeof updateMatchParams>;

export const getAllMatches = async (params: UpdateMatchParams) => {
  const response = await clientApi.get<Match>(
    clientRoutes.tournaments.matches.getAll(params.tournamentId),
    { params }
  );
  return response.data;
};
