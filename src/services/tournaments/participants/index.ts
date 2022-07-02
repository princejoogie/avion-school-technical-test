import { getAllParticipants } from "./get-all";
import { createParticipant } from "./create";
import { randomizeParticipants } from "./randomize";

export const ParticipantsService = Object.freeze({
  getAll: getAllParticipants,
  create: createParticipant,
  randomize: randomizeParticipants,
});
