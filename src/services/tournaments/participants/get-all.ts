/* eslint-disable no-console */
import { z } from "zod";

import { participantResponse } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";

export const getAllParticipantsParams = z.object({ tournamentId: z.string() });

export type GetAllParticipantsParams = z.infer<typeof getAllParticipantsParams>;

export const getAllParticipantsResponse = z.array(participantResponse);

export type GetAllParticipantsResponse = z.infer<
  typeof getAllParticipantsResponse
>;

export const getAllParticipants = async (params: GetAllParticipantsParams) => {
  const response = await clientApi.get<GetAllParticipantsResponse>(
    clientRoutes.tournaments.participants.getAll(params.tournamentId),
    { params }
  );
  return response.data;
};
