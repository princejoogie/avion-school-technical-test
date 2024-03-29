import { create } from "./create";
import { deleteTournament } from "./delete";
import { finalizeTournament } from "./finalize";
import { getAll } from "./get-all";
import { getById } from "./get-by-id";
import { startTournament } from "./start";
import { update } from "./update";

export const TournamentService = Object.freeze({
  create,
  deleteTournament,
  finalizeTournament,
  getAll,
  getById,
  startTournament,
  update,
});
