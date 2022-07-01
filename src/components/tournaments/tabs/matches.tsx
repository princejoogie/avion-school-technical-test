import React from "react";

export interface MatchesTabProps {
  tournamentId: string;
}

export const MatchesTab = ({ tournamentId }: MatchesTabProps) => {
  return <div>Matches Tab {tournamentId}</div>;
};
