/* eslint-disable no-console */
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

import { participantResponse } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";
import { ErrorData } from "@/types";

export const getAllParams = z.object({ tournamentId: z.string() });

export type GetAllParams = z.infer<typeof getAllParams>;

export const getAllResponse = z.array(participantResponse);

export type GetAllResponse = z.infer<typeof getAllResponse>;

export const getAll = async (params: GetAllParams) => {
  try {
    const response = await clientApi.get<GetAllResponse>(
      clientRoutes.tournaments.participants.getAll(params.tournamentId),
      { params }
    );
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data as ErrorData;
      toast.error(error.message);
      console.error(e);
      return [];
    }

    const error = e as any;
    toast.error(`${error.message}`);
    console.error(e);
    return [];
  }
};
