import React from "react";

import { TournamentState } from "@/services/tournaments/common";

export interface State<T = string> {
  value: T;
  label: string;
  style: string;
}

export const tournamentStates: State<TournamentState>[] = [
  { value: "all", label: "All", style: "bg-gray-500" },
  { value: "awaiting_review", label: "Awaiting Review", style: "bg-red-500" },
  { value: "complete", label: "Complete", style: "bg-blue-500" },
  { value: "pending", label: "Pending", style: "bg-yellow-500" },
  { value: "underway", label: "In Progress", style: "bg-green-500" },
];

export const matchesStates: State[] = [
  { value: "complete", label: "Complete", style: "bg-blue-500" },
  { value: "open", label: "Open", style: "bg-green-500" },
  { value: "pending", label: "Pending", style: "bg-yellow-500" },
];

export interface TagProps {
  type?: "tournament" | "match";
  state: string;
}

export const Tag = ({ type = "tournament", state }: TagProps) => {
  let stateFound = null;
  if (type === "tournament") {
    stateFound = tournamentStates.find((s) => s.value === state);
  } else if (type === "match") {
    stateFound = matchesStates.find((s) => s.value === state);
  }

  if (!state || !stateFound) return null;
  const { label, style } = stateFound;

  return (
    <span
      className={`rounded-full px-3 py-1 inline text-[0.6rem] text-white ${style}`}
    >
      {label}
    </span>
  );
};
