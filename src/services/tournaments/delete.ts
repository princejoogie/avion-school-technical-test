import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

export const deleteTournamentParams = z.object({ id: z.string() });

export type DeleteTournamentParams = z.infer<typeof deleteTournamentParams>;

export const deleteTournament = async (params: DeleteTournamentParams) => {
  const response = await clientApi.delete(
    clientRoutes.tournaments.delete(params.id),
    { params }
  );
  return response.data;
};
