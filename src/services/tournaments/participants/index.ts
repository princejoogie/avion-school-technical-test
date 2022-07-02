import { createParticipant } from "./create";
import { deleteParticipant } from "./delete";
import { getAllParticipants } from "./get-all";
import { randomizeParticipants } from "./randomize";
import { updateParticipant } from "./update";

export const ParticipantsService = Object.freeze({
  create: createParticipant,
  delete: deleteParticipant,
  getAll: getAllParticipants,
  randomize: randomizeParticipants,
  update: updateParticipant,
});
