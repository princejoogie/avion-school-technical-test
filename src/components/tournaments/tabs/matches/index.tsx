import React from "react";
import { useQuery } from "react-query";

import { Tournament } from "@/services/tournaments/common";
import { MatchesService } from "@/services/tournaments/matches";
import { Tag } from "@/components/tag";

export interface MatchesTabProps {
  tournament: Tournament;
}

export const MatchesTab = ({ tournament }: MatchesTabProps) => {
  const { id: tournamentId } = tournament.tournament;

  const tournamentMatches = useQuery(["matches", { tournamentId }], () =>
    MatchesService.getAll({ tournamentId: tournamentId.toString() })
  );

  if (tournamentMatches.isLoading) {
    return <div>Loading...</div>;
  }

  if (tournamentMatches.isError || !tournamentMatches.data) {
    return <div>Something went wrong</div>;
  }

  const matches = tournamentMatches.data;

  return (
    <div>
      {matches
        .sort((a, b) => a.match.round - b.match.round)
        .map(({ match }) => (
          <div key={match.id}>
            <span>
              Round {match.round} - {match.id}{" "}
              <Tag state={match.state} type="match" />
            </span>
          </div>
        ))}
    </div>
  );
};
