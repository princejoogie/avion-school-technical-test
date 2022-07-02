import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

import { Tournament } from "./common";

export const getByIdParams = z.object({
  tournamentId: z.string(),
  includeParticipants: z.boolean().default(true).optional(),
  includeMatches: z.boolean().default(true).optional(),
});

export type GetByIdParams = z.infer<typeof getByIdParams>;

export const getById = async (params: GetByIdParams) => {
  const { tournamentId } = params;
  const response = await clientApi.get<Tournament>(
    clientRoutes.tournaments.getById(tournamentId),
    { params }
  );
  return response.data;
};
