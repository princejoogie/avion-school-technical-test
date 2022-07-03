import { z } from "zod";

import { clientRoutes, clientApi } from "@/services/api-base";

export const finalizeTournamentParams = z.object({ tournamentId: z.string() });

export type FinalizeTournamentParams = z.infer<typeof finalizeTournamentParams>;

export const finalizeTournament = async (params: FinalizeTournamentParams) => {
  const response = await clientApi.post(
    clientRoutes.tournaments.finalize(params.tournamentId),
    params
  );
  return response.data;
};
