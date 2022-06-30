import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { clientRoutes, clientApi } from "../api-base";

export const deleteTournamentParams = z.object({ id: z.string() });

export type DeleteTournamentParams = z.infer<typeof deleteTournamentParams>;

export const deleteTournament = async (params: DeleteTournamentParams) => {
  try {
    const response = await clientApi.delete(clientRoutes.tournaments.create, {
      params,
    });
    return response.data;
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(e.message);
    }

    if (e instanceof AxiosError) {
      throw new Error(e.message);
    }

    throw e;
  }
};
