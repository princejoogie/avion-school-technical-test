import React from "react";
import { useMutation } from "react-query";

import { Tournament } from "@/services/tournaments/common";
import { Button } from "@/components/button";
import { TournamentService } from "@/services/tournaments";
import { queryClient } from "@/pages/_app";
import { MatchWithParticipant } from "@/types";

export interface SidePanelProps {
  tournament: Tournament;
  matches: MatchWithParticipant[];
  matchProgress: string;
}

export const SidePanel = ({
  tournament,
  matches,
  matchProgress,
}: SidePanelProps) => {
  const startTournament = useMutation(TournamentService.startTournament, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "matches",
        { tournamentId: tournament.tournament.id },
      ]);
      queryClient.invalidateQueries([
        "tournament",
        { tournamentId: tournament.tournament.id.toString() },
      ]);
    },
  });

  const finalizeTournament = useMutation(TournamentService.finalizeTournament, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "matches",
        { tournamentId: tournament.tournament.id },
      ]);
      queryClient.invalidateQueries([
        "tournament",
        { tournamentId: tournament.tournament.id.toString() },
      ]);
    },
  });

  const { state, id } = tournament.tournament;

  return (
    <div className="h-min col-span-12 md:col-span-4 text-sm text-gray-500 bg-white border rounded-md p-4">
      {state === "pending" && (
        <Button
          disabled={startTournament.isLoading}
          onClick={() => {
            startTournament.mutate({ tournamentId: id.toString() });
          }}
          className="w-full"
        >
          {startTournament.isLoading ? "Starting..." : "Start Tournament"}
        </Button>
      )}

      {state === "awaiting_review" && (
        <Button
          variant="danger"
          disabled={finalizeTournament.isLoading}
          onClick={() => {
            finalizeTournament.mutate({ tournamentId: id.toString() });
          }}
          className="w-full"
        >
          {startTournament.isLoading ? "Ending..." : "End Tournament"}
        </Button>
      )}

      {(state === "pending" || state === "underway") && matches.length > 0 && (
        <>
          <h5>Match Progress - {matchProgress}%</h5>
          <div className="mt-1 text-white w-full rounded bg-gray-50 border overflow-hidden">
            <div
              className="h-4 animate-pulse text-center transition-all bg-blue-500"
              style={{
                width: `${matchProgress}%`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
