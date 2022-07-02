import React from "react";

import { Participant } from "@/services/tournaments/participants/common";

export interface ParticipantCardProps {
  participant: Participant;
}

export const ParticipantCard = ({ participant }: ParticipantCardProps) => {
  const { name, seed } = participant.participant;

  return (
    <div className="bg-white border rounded-md px-4 py-2">
      {seed} - {name}
    </div>
  );
};
