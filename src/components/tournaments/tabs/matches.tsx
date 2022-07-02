import React from "react";
import { useQuery } from "react-query";

import { Tournament } from "@/services/tournaments/common";
import { MatchesService } from "@/services/tournaments/matches";

export interface MatchesTabProps {
  tournament: Tournament;
}

export const MatchesTab = ({ tournament }: MatchesTabProps) => {
  const { id: tournamentId } = tournament.tournament;

  const matches = useQuery(["matches", { tournamentId }], () =>
    MatchesService.getAll({ tournamentId: tournamentId.toString() })
  );

  return (
    <div>
      <pre>{JSON.stringify(matches.data ?? "Loading...", null, 2)}</pre>
    </div>
  );
};
