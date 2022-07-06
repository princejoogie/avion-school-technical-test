/* eslint-disable no-nested-ternary */
/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";

import { MatchWithParticipant } from "@/types";
import { Participant } from "@/services/tournaments/participants/common";
import { TextInput } from "@/components/text-input";
import { Button } from "@/components/button";
import { MatchesService } from "@/services/tournaments/matches";
import { queryClient } from "@/pages/_app";
import { Tournament } from "@/services/tournaments/common";

export interface MatchDetailsProps {
  match: MatchWithParticipant;
  tournament: Tournament;
  onUpdateFinish: () => void;
}

interface ItemContainerProps {
  player: Participant | null;
  score: string | null;
  isWinner: boolean;
}

const ItemContainer = ({ player, score, isWinner }: ItemContainerProps) => {
  return (
    <div className="border flex-1 h-full rounded">
      <div className="flex flex-col items-center p-4">
        {player?.participant.attached_participatable_portrait_url ? (
          <img
            className="h-12 w-12 mx-20 object-contain rounded-full"
            src={player?.participant.attached_participatable_portrait_url}
            alt={player?.participant.name}
          />
        ) : (
          <div className="uppercase h-12 w-12 mx-20 grid place-items-center rounded-full bg-gray-300">
            {player?.participant.name[0] ?? "?"}
          </div>
        )}

        <h6 className="text-gray-700 mt-2 text-sm w-full text-center">
          {player?.participant.name ?? (
            <span className="italic font-mono text-gray-500">
              To be determined
            </span>
          )}
        </h6>
      </div>

      <p
        className={`border-t w-full py-2 text-center font-bold text-lg ${
          isWinner ? "bg-blue-500 text-white" : "bg-gray-50 text-black"
        }`}
      >
        {!!score ? score : "-"}
      </p>
    </div>
  );
};

export const MatchDetails = ({
  match,
  tournament,
  onUpdateFinish,
}: MatchDetailsProps) => {
  const [tab, setTab] = useState<"match_details" | "report_scores">(
    "match_details"
  );
  const { state, winner_id } = match.match;
  const { player1, player2 } = match;

  const score = match.match.scores_csv.split("-");
  const player1Score = score?.[0] ?? null;
  const player2Score = score?.[1] ?? null;

  const player1Win = player1?.participant.id === winner_id;
  const player2Win = player2?.participant.id === winner_id;

  const [p1Score, setP1Score] = useState(!!player1Score ? player1Score : "0");
  const [p2Score, setP2Score] = useState(!!player2Score ? player2Score : "0");

  const [winnerId, setWinnerId] = useState<string | null>(
    player1Win
      ? player1.participant.id.toString()
      : player2Win
      ? player2.participant.id.toString()
      : null
  );

  useEffect(() => {
    if (+p1Score > +p2Score) {
      setWinnerId(player1?.participant.id.toString() ?? null);
    } else if (+p2Score > +p1Score) {
      setWinnerId(player2?.participant.id.toString() ?? null);
    } else {
      setWinnerId("tie");
    }
  }, [p1Score, p2Score]);

  const updateMatch = useMutation(MatchesService.update, {
    onSettled: () => {
      queryClient.invalidateQueries([
        "matches",
        { tournamentId: match.match.tournament_id },
      ]);
      queryClient.invalidateQueries([
        "tournament",
        { tournamentId: Number(match.match.tournament_id) },
      ]);
      onUpdateFinish();
    },
  });

  return (
    <>
      <div className="text-gray-500 text-sm">
        <button
          type="button"
          disabled={tab === "match_details"}
          onClick={() => setTab("match_details")}
          className={`group transition-colors hover:bg-gray-50 ${
            tab === "match_details" ? "text-black" : ""
          }`}
        >
          <p className="px-4 mt-2">Match details</p>

          <div
            className={`hover:bg-gray-100 w-full mt-2 h-1 ${
              tab === "match_details" ? "bg-green-500" : "bg-white"
            }`}
          />
        </button>

        {state !== "pending" && tournament.tournament.state !== "complete" && (
          <button
            type="button"
            disabled={tab === "report_scores"}
            onClick={() => setTab("report_scores")}
            className={`group transition-colors hover:bg-gray-50 ${
              tab === "report_scores" ? "text-black" : ""
            }`}
          >
            <p className="px-4 mt-2">Report scores</p>

            <div
              className={`hover:bg-gray-100 w-full mt-2 h-1 ${
                tab === "report_scores" ? "bg-green-500" : "bg-white"
              }`}
            />
          </button>
        )}
      </div>

      {tab === "match_details" ? (
        <div className="flex mt-4">
          <ItemContainer
            player={player1}
            score={player1Score}
            isWinner={player1Win}
          />

          <p className="font-bold flex flex-col items-center justify-center mx-4">
            VS
          </p>

          <ItemContainer
            player={player2}
            score={player2Score}
            isWinner={player2Win}
          />
        </div>
      ) : (
        <div>
          <table className="w-full mt-4">
            <thead>
              <tr className="text-left border-b">
                <th className="px-3 py-2">Player</th>
                <th className="px-3 py-2">Score</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm">
              <tr className="bg-gray-50">
                <td className="px-3 py-2 pr-44">
                  {player1?.participant.name ?? "To be determined"}
                </td>
                <td className="px-3 py-2">
                  <TextInput
                    className="w-20 !bg-gray-100"
                    type="number"
                    value={p1Score}
                    onChange={(e) => setP1Score(e.target.value)}
                  />
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-3 py-2 pr-44">
                  {player2?.participant.name ?? "To be determined"}
                </td>
                <td className="px-3 py-2">
                  <TextInput
                    className="w-20"
                    type="number"
                    value={p2Score}
                    onChange={(e) => setP2Score(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6">
            <h4 className="text-center w-full font-semibold text-lg">
              Verify the winner
            </h4>

            <div className="text-white flex items-center">
              <button
                type="button"
                className={`px-6 py-1 flex-1 ${
                  winnerId === player1?.participant.id.toString()
                    ? "bg-blue-500"
                    : "bg-gray-500"
                }`}
                onClick={() =>
                  setWinnerId(player1?.participant.id.toString() ?? null)
                }
              >
                {player1?.participant.name ?? (
                  <span className="italic font-mono text-gray-500">
                    To be determined
                  </span>
                )}
              </button>

              <button
                type="button"
                className={`px-6 py-1 flex-1 ${
                  winnerId === player2?.participant.id.toString()
                    ? "bg-blue-500"
                    : "bg-gray-500"
                }`}
                onClick={() =>
                  setWinnerId(player2?.participant.id.toString() ?? null)
                }
              >
                <p>
                  {player2?.participant.name ?? (
                    <span className="italic font-mono text-gray-500">
                      To be determined
                    </span>
                  )}
                </p>
              </button>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                disabled={updateMatch.isLoading}
                onClick={() => {
                  updateMatch.mutate({
                    matchId: match.match.id.toString(),
                    tournamentId: match.match.tournament_id.toString(),
                    "match[scores_csv]": `${p1Score}-${p2Score}`,
                    "match[winner_id]": winnerId,
                  });
                }}
              >
                {updateMatch.isLoading ? "Submitting..." : "Submit scores"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
