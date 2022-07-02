import { createParticipant } from "./create";
import { getAllParticipants } from "./get-all";
import { randomizeParticipants } from "./randomize";
import { updateParticipant } from "./update";

export const ParticipantsService = Object.freeze({
  create: createParticipant,
  getAll: getAllParticipants,
  randomize: randomizeParticipants,
  update: updateParticipant,
});
