import React from "react";
import { useQuery } from "react-query";

import { ParticipantsService } from "@/services/tournaments/participants";

export interface ParticipantsTabProps {
  tournamentId: string;
}

export const ParticipantsTab = ({ tournamentId }: ParticipantsTabProps) => {
  const participants = useQuery(["participants", { tournamentId }], () =>
    ParticipantsService.getAll({ tournamentId })
  );

  return (
    <div>
      <pre>{JSON.stringify(participants.data ?? "loading...", null, 2)}</pre>
    </div>
  );
};
