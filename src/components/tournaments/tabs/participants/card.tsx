import React from "react";

import { Participant } from "@/services/tournaments/participants/common";

export interface ParticipantCardProps {
  participant: Participant;
}

export const ParticipantCard = ({ participant }: ParticipantCardProps) => {
  const { name, seed } = participant.participant;

  return (
    <div>
      {seed} - {name}
    </div>
  );
};
