/* eslint-disable no-nested-ternary */
import React from "react";
import { useMutation, useQuery } from "react-query";
import { CheckIcon, CogIcon } from "@heroicons/react/solid";

import { ParticipantCard } from "./card";
import { AddParticipantCard } from "./add-participant";

import { Tournament } from "@/services/tournaments/common";
import { ParticipantsService } from "@/services/tournaments/participants";
import { Button } from "@/components";
import { queryClient } from "@/pages/_app";

export interface ParticipantsTabProps {
  tournament: Tournament;
}

export const ParticipantsTab = ({ tournament }: ParticipantsTabProps) => {
  const { id: tournamentId, state } = tournament.tournament;
  const participants = useQuery(
    ["participants", { tournamentId: tournamentId.toString() }],
    () => ParticipantsService.getAll({ tournamentId: tournamentId.toString() }),
    { refetchOnWindowFocus: false }
  );
  const randomize = useMutation(ParticipantsService.randomize, {
    onSuccess: () =>
      queryClient.invalidateQueries([
        "participants",
        { tournamentId: tournamentId.toString() },
      ]),
  });

  if (participants.isLoading) {
    return <div>Loading...</div>;
  }

  if (participants.isError || !participants.data) {
    return <div>Something went wrong</div>;
  }

  const canAddOrShuffle = state === "pending" && participants.data.length > 0;

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8 h-min">
        {canAddOrShuffle && (
          <div className="flex items-center justify-between mb-4">
            <Button
              disabled={randomize.isLoading}
              onClick={() => {
                randomize.mutate({ tournamentId: tournamentId.toString() });
              }}
            >
              {randomize.isLoading ? "Shuffling..." : "Shuffle Seeds"}
            </Button>

            {randomize.isLoading ||
            participants.isLoading ||
            participants.isRefetching ||
            participants.isFetching ? (
              <div className="text-sm text-green-500 flex items-center">
                <CogIcon className="w-4 h-4 mr-1 animate-spin" />
                <span>Loading</span>
              </div>
            ) : randomize.isSuccess || participants.isSuccess ? (
              <div className="text-sm text-green-500 flex items-center">
                <CheckIcon className="w-4 h-4 mr-1" />
                <span>Saved</span>
              </div>
            ) : null}
          </div>
        )}

        {participants.data.length > 0 ? (
          <div
            className={`flex mb-10 w-full transition-opacity flex-col space-y-2 ${
              participants.isFetching || participants.isRefetching
                ? "opacity-50 animate-pulse"
                : "opacity-100"
            }`}
          >
            {participants.data
              .sort((a, b) => a.participant.seed - b.participant.seed)
              .map((participant) => (
                <ParticipantCard
                  key={participant.participant.id}
                  participant={participant}
                  tournament={tournament}
                />
              ))}
          </div>
        ) : null}

        {state === "pending" && (
          <AddParticipantCard
            tournamentId={tournament.tournament.id.toString()}
          />
        )}
      </div>

      <div className="h-min col-span-12 md:col-span-4 text-sm text-gray-500 bg-white border rounded-md p-4">
        Fill in{" "}
        <pre className="inline bg-gray-100 px-2 text-green-500">Email</pre> or{" "}
        <pre className="inline bg-gray-100 px-2 text-green-500">Username</pre>{" "}
        for your participants to activate features like stat tracking, match
        alerts, player score reporting, and more.
        <br />
        <br />
        If you&apos;re hosting as a{" "}
        <a
          className="text-blue-500 hover:underline"
          href="https://challonge.com/communities"
          target="_blank"
          rel="noreferrer"
        >
          Challonge Community
        </a>
        , you&apos;ll also activate player ratings and leaderboards, plus
        you&apos;ll gain followers that you can contact with community
        announcements.
      </div>
    </div>
  );
};
