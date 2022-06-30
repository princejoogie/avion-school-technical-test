import { getAll, Tournaments } from "./get-all";
import { create } from "./create";
import { deleteTournament } from "./delete";

export const TournamentService = {
  getAll,
  create,
  deleteTournament,
} as const;

export type TournamentState = Tournaments[number]["tournament"]["state"];
export const tournamentStates: {
  value: TournamentState;
  label: string;
  style: string;
}[] = [
  { value: "all", label: "All", style: "bg-gray-500" },
  { value: "awaiting_review", label: "Awaiting Review", style: "bg-red-500" },
  { value: "complete", label: "Complete", style: "bg-blue-500" },
  { value: "pending", label: "Pending", style: "bg-yellow-500" },
  { value: "underway", label: "In Progress", style: "bg-green-500" },
];
