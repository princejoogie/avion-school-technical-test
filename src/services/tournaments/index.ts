import { getAll } from "./get-all";
import { create } from "./create";
import { deleteTournament } from "./delete";
import { getById } from "./get-by-id";

export const TournamentService = {
  getAll,
  getById,
  create,
  deleteTournament,
} as const;
