import { z } from "zod";

import { matchResponse } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";

export const getAllMatchesParams = z.object({ tournamentId: z.string() });

export type GetAllMatchesParams = z.infer<typeof getAllMatchesParams>;

export const getAllMatchesResponse = z.array(matchResponse);

export type GetAllMatchesResponse = z.infer<typeof getAllMatchesResponse>;

export const getAllMatches = async (params: GetAllMatchesParams) => {
  const response = await clientApi.get<GetAllMatchesResponse>(
    clientRoutes.tournaments.matches.getAll(params.tournamentId),
    { params }
  );
  return response.data;
};
