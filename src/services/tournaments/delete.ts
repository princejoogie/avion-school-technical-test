/* eslint-disable no-console */
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

import { ErrorData } from "@/types";

export const deleteTournamentParams = z.object({ id: z.string() });

export type DeleteTournamentParams = z.infer<typeof deleteTournamentParams>;

export const deleteTournament = async (params: DeleteTournamentParams) => {
  try {
    const response = await clientApi.delete(
      clientRoutes.tournaments.delete(params.id),
      { params }
    );
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data as ErrorData;
      toast.error(error.message);
      console.error(e);
      return undefined;
    }

    const error = e as any;
    toast.error(`${error.message}`);
    console.error(e);
    return undefined;
  }
};
