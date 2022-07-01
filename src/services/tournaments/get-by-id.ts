/* eslint-disable no-console */
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

import { Tournament } from "./common";

import { ErrorData } from "@/types";

export const getByIdParams = z.object({
  tournamentId: z.string(),
  includeParticipants: z.boolean().default(true).optional(),
  includeMatches: z.boolean().default(true).optional(),
});

export type GetByIdParams = z.infer<typeof getByIdParams>;

export const getById = async (params: GetByIdParams) => {
  const { tournamentId } = params;
  try {
    const response = await clientApi.get<Tournament>(
      clientRoutes.tournaments.getById(tournamentId),
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
