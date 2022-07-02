import { z } from "zod";

import { Participant } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";

export const deleteParticipantParams = z.object({
  tournamentId: z.string(),
  participantId: z.string(),
});

export type DeleteParticipantParams = z.infer<typeof deleteParticipantParams>;

export const deleteParticipant = async (params: DeleteParticipantParams) => {
  const response = await clientApi.delete<Participant>(
    clientRoutes.tournaments.participants.delete(
      params.tournamentId,
      params.participantId
    ),
    { params }
  );
  return response.data;
};
