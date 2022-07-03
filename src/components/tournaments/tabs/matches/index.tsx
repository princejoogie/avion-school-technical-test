/* eslint-disable no-plusplus */
import React from "react";
import { useQuery } from "react-query";

import { MatchCard, MatchWithParticipant } from "./card";
import { SidePanel } from "./side-panel";

import { Collapsable } from "@/components";
import { Tournament } from "@/services/tournaments/common";
import { MatchesService } from "@/services/tournaments/matches";
import { ParticipantsService } from "@/services/tournaments/participants";

export interface MatchesTabProps {
  tournament: Tournament;
}

export const MatchesTab = ({ tournament }: MatchesTabProps) => {
  const { id: tournamentId } = tournament.tournament;

  const tournamentMatches = useQuery(
    ["matches", { tournamentId }],
    () => MatchesService.getAll({ tournamentId: tournamentId.toString() }),
    { refetchOnWindowFocus: false }
  );

  const tournamentParticipants = useQuery(
    ["participants", { tournamentId }],
    () => ParticipantsService.getAll({ tournamentId: tournamentId.toString() }),
    { refetchOnWindowFocus: false }
  );

  if (tournamentMatches.isLoading || tournamentParticipants.isLoading) {
    return <div>Loading...</div>;
  }

  if (
    tournamentMatches.isError ||
    !tournamentMatches.data ||
    tournamentParticipants.isError ||
    !tournamentParticipants.data
  ) {
    return <div>Something went wrong</div>;
  }

  const participants = tournamentParticipants.data;
  const matches = tournamentMatches.data.map<MatchWithParticipant>((e) => {
    const player1 = participants.find(
      ({ participant }) => participant.id === e.match.player1_id
    );
    const player2 = participants.find(
      ({ participant }) => participant.id === e.match.player2_id
    );

    return {
      match: e.match,
      player1: player1 ?? null,
      player2: player2 ?? null,
    };
  });

  const openMatches = matches
    .filter(({ match }) => match.state === "open")
    .sort((a, b) => a.match.round - b.match.round);
  const pendingMatches = matches
    .filter(({ match }) => match.state === "pending")
    .sort((a, b) => a.match.round - b.match.round);
  const completedMatches = matches
    .filter(({ match }) => match.state === "complete")
    .sort((a, b) => a.match.round - b.match.round);

  const isLoading =
    tournamentMatches.isRefetching || tournamentParticipants.isRefetching;
  const matchProgress = (
    (completedMatches.length / matches.length) *
    100
  ).toFixed(2);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div
        className={`col-span-12 md:col-span-8 h-min transition-opacity ${
          isLoading ? "opacity-50 animate-pulse" : "opacity-100"
        }`}
      >
        <Collapsable
          title={`Open - ${openMatches.length}`}
          buttonClassname="!bg-green-100"
          initialOpen
        >
          {openMatches.length > 0 && (
            <div className="mt-2 flex flex-col space-y-1">
              {openMatches.map((match) => (
                <MatchCard key={match.match.id} match={match} />
              ))}
            </div>
          )}
        </Collapsable>

        <Collapsable
          title={`Pending - ${pendingMatches.length}`}
          buttonClassname="!bg-yellow-100"
          containerClassname="mt-4"
          initialOpen
        >
          {pendingMatches.length > 0 && (
            <div className="mt-2 flex flex-col space-y-1">
              {pendingMatches.map((match) => (
                <MatchCard key={match.match.id} match={match} />
              ))}
            </div>
          )}
        </Collapsable>

        <Collapsable
          title={`Complete - ${completedMatches.length}`}
          buttonClassname="!bg-blue-100"
          containerClassname="mt-4"
          initialOpen
        >
          {completedMatches.length > 0 && (
            <div className="mt-2 flex flex-col space-y-1">
              {completedMatches.map((match) => (
                <MatchCard key={match.match.id} match={match} />
              ))}
            </div>
          )}
        </Collapsable>
      </div>

      <SidePanel
        matchProgress={matchProgress}
        tournament={tournament}
        matches={matches}
      />
    </div>
  );
};
