import { getAll, Tournaments } from "./get-all";
import { create } from "./create";
import { deleteTournament } from "./delete";

export const TournamentService = {
  getAll,
  create,
  deleteTournament,
} as const;

export type TournamentState = Tournaments[number]["tournament"]["state"];
export const tournamentStates: { value: TournamentState; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "complete", label: "Complete" },
  { value: "in_progress", label: "In Progress" },
];
