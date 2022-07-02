import React from "react";
import { useQuery } from "react-query";

import { ParticipantCard } from "./card";

import { Tournament } from "@/services/tournaments/common";
import { ParticipantsService } from "@/services/tournaments/participants";
import { Button } from "@/components";

export interface ParticipantsTabProps {
  tournament: Tournament;
}

export const ParticipantsTab = ({ tournament }: ParticipantsTabProps) => {
  const { id: tournamentId, state } = tournament.tournament;
  const participants = useQuery(["participants", { tournamentId }], () =>
    ParticipantsService.getAll({ tournamentId: tournamentId.toString() })
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
          <Button className="uppercase">Shuffle Seeds</Button>
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
