import { z } from "zod";

import { Participant } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";

export const updateParticipantParams = z.object({
  tournamentId: z.string(),
  participantId: z.string(),
  "participant[name]": z.string().optional(),
  "participant[seed]": z.number().optional(),
});

export type UpdateParticipantParams = z.infer<typeof updateParticipantParams>;

export const updateParticipant = async (params: UpdateParticipantParams) => {
  const response = await clientApi.put<Participant>(
    clientRoutes.tournaments.participants.update(
      params.tournamentId,
      params.participantId
    ),
    params
  );
  return response.data;
};
