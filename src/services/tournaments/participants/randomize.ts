import { z } from "zod";

import { clientRoutes, clientApi } from "@/services/api-base";

export const randomizeParticipantsParams = z.object({
  tournamentId: z.string(),
});

export type RandomizeParticipantsParams = z.infer<
  typeof randomizeParticipantsParams
>;

export const randomizeParticipants = async (
  params: RandomizeParticipantsParams
) => {
  const response = await clientApi.post(
    clientRoutes.tournaments.participants.randomize(params.tournamentId),
    { params }
  );
  return response.data;
};
