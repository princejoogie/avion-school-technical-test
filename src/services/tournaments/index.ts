import { getAll } from "./get-all";
import { create } from "./create";
import { deleteTournament } from "./delete";
import { getById } from "./get-by-id";
import { startTournament } from "./start";

export const TournamentService = Object.freeze({
  getAll,
  getById,
  create,
  deleteTournament,
  startTournament,
});
