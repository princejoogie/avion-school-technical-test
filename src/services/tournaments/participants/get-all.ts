/* eslint-disable no-console */
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

import { participantResponse } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";
import { ErrorData } from "@/types";

export const getAllParticipantsParams = z.object({ tournamentId: z.string() });

export type GetAllParticipantsParams = z.infer<typeof getAllParticipantsParams>;

export const getAllParticipantsResponse = z.array(participantResponse);

export type GetAllParticipantsResponse = z.infer<
  typeof getAllParticipantsResponse
>;

export const getAllParticipants = async (params: GetAllParticipantsParams) => {
  try {
    const response = await clientApi.get<GetAllParticipantsResponse>(
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
