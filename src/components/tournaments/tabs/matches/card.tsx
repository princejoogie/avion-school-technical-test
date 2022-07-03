import React from "react";

import { Match } from "@/services/tournaments/matches/common";
import { Participant } from "@/services/tournaments/participants/common";

export type MatchWithParticipant = Match & {
  player1: Participant | null;
  player2: Participant | null;
};

export interface MatchesTabProps {
  match: MatchWithParticipant;
}

export const MatchCard = ({ match }: { match: MatchWithParticipant }) => {
  const { state, winner_id } = match.match;
  const { player1, player2 } = match;

  const score = match.match.scores_csv.split("-");
  const player1Score = score?.[0] ?? null;
  const player2Score = score?.[1] ?? null;

  const player1Win = player1?.participant.id === winner_id;
  const player2Win = player2?.participant.id === winner_id;

  return (
    <button
      type="button"
      className="w-full bg-white text-gray-700 p-2 rounded border"
    >
      <div className="text-sm flex items-center space-x-6 justify-between">
        <div className="flex items-center space-x-2 justify-end flex-1">
          <div className="flex w-full items-center space-x-1">
            {player1?.participant.attached_participatable_portrait_url ? (
              <img
                className="h-8 w-8 rounded-full"
                src={player1?.participant.attached_participatable_portrait_url}
                alt={player1?.participant.name}
              />
            ) : (
              <div className="uppercase h-8 grid place-items-center w-8 rounded-full bg-gray-300">
                {player1?.participant.name[0] ?? "?"}
              </div>
            )}

            <h6 className="flex-1 text-right">
              {player1?.participant.name ?? "TBD"}
            </h6>
          </div>

          {player1Score && state === "complete" && (
            <p
              className={`rounded font-mono px-4 border ${
                player1Win ? "bg-blue-500 text-white" : "bg-gray-50"
              }`}
            >
              {player1Score}
            </p>
          )}
        </div>

        <p className="font-bold">VS</p>

        <div className="mt-1 flex items-center space-x-2 justify-start flex-1">
          {player2Score && state === "complete" && (
            <p
              className={`rounded font-mono px-4 border ${
                player2Win ? "bg-blue-500 text-white" : "bg-gray-50"
              }`}
            >
              {player2Score}
            </p>
          )}

          <div className="flex w-full items-center space-x-1">
            <h6 className="flex-1 text-left">
              {player2?.participant.name ?? "TBD"}
            </h6>

            {player2?.participant.attached_participatable_portrait_url ? (
              <img
                className="h-8 w-8 rounded-full"
                src={player2?.participant.attached_participatable_portrait_url}
                alt={player2?.participant.name}
              />
            ) : (
              <div className="uppercase h-8 grid place-items-center w-8 rounded-full bg-gray-300">
                {player2?.participant.name[0] ?? "?"}
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
