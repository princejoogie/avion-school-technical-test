import { z } from "zod";

import { Participant } from "./common";

import { clientRoutes, clientApi } from "@/services/api-base";

export const createParticipantParams = z.object({
  tournamentId: z.string(),
  "participant[name]": z.string(),
  "participant[email]": z.string(),
  "participant[seed]": z.number().optional(),
  "participant[challonge_username]": z.string().optional(),
  "participant[misc]": z.string().max(255).optional(),
});

export type CreateParticipantParams = z.infer<typeof createParticipantParams>;

export const createParticipant = async (params: CreateParticipantParams) => {
  const response = await clientApi.post<Participant>(
    clientRoutes.tournaments.participants.create(params.tournamentId),
    params
  );
  return response.data;
};
