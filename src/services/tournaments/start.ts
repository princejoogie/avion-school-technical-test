import { z } from "zod";

import { clientRoutes, clientApi } from "@/services/api-base";

export const startTournamentParams = z.object({
  tournamentId: z.string(),
});

export type StartTournamentParams = z.infer<typeof startTournamentParams>;

export const startTournament = async (params: StartTournamentParams) => {
  const response = await clientApi.post(
    clientRoutes.tournaments.start(params.tournamentId),
    params
  );
  return response.data;
};
