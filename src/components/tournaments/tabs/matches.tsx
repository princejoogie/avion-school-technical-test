import React from "react";

import { Tournament } from "@/services/tournaments/common";

export interface MatchesTabProps {
  tournament: Tournament;
}

export const MatchesTab = ({ tournament }: MatchesTabProps) => {
  const { id: tournamentId } = tournament.tournament;
  return <div>Matches Tab {tournamentId}</div>;
};
