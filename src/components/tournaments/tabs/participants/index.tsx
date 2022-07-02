import React from "react";
import { useMutation, useQuery } from "react-query";

import { ParticipantCard } from "./card";

import { Tournament } from "@/services/tournaments/common";
import { ParticipantsService } from "@/services/tournaments/participants";
import { Button } from "@/components";
import { queryClient } from "@/pages/_app";

export interface ParticipantsTabProps {
  tournament: Tournament;
}

export const ParticipantsTab = ({ tournament }: ParticipantsTabProps) => {
  const { id: tournamentId, state } = tournament.tournament;
  const participants = useQuery(["participants", { tournamentId }], () =>
    ParticipantsService.getAll({ tournamentId: tournamentId.toString() })
  );
  const randomize = useMutation(
    ["randomizeParticipants", { tournamentId }],
    () =>
      ParticipantsService.randomize({ tournamentId: tournamentId.toString() }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["participants", { tournamentId }]),
    }
  );

  if (participants.isLoading) {
    return <div>Loading...</div>;
  }

  if (participants.isError || !participants.data) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="w-full md:w-2/3">
      {state === "pending" && (
        <div>
          <Button
            disabled={randomize.isLoading}
            onClick={() => randomize.mutate()}
            className="uppercase"
          >
            {randomize.isLoading ? "Shuffling..." : "Shuffle Seeds"}
          </Button>
        </div>
      )}

      {participants.data
        .sort((a, b) => a.participant.seed - b.participant.seed)
        .map((participant) => (
          <ParticipantCard
            key={participant.participant.id}
            participant={participant}
          />
        ))}
    </div>
  );
};
