import { getAll } from "./get-all";
import { create } from "./create";
import { deleteTournament } from "./delete";

export const TournamentService = {
  getAll,
  create,
  deleteTournament,
} as const;
