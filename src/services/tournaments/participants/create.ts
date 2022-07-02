import { z } from "zod";

import { Participant } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";

export const createParticipantsParams = z.object({
  tournamentId: z.string(),
  "participant[name]": z.string(),
  "participant[email]": z.string(),
  "participant[seed]": z.number(),
  "participant[challonge_username]": z.string(),
  "participant[misc]": z.string().max(255),
});

export type CreateParticipantsParams = z.infer<typeof createParticipantsParams>;

export const getAllParticipants = async (params: CreateParticipantsParams) => {
  const response = await clientApi.get<Participant>(
    clientRoutes.tournaments.participants.getAll(params.tournamentId),
    { params }
  );
  return response.data;
};
