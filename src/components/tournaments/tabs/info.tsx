import React from "react";

import { Tournament } from "@/services/tournaments/common";

interface InfoTabProps {
  tournament: Tournament;
}

export const InfoTab = ({ tournament }: InfoTabProps) => {
  const { description } = tournament.tournament;
  return <div>{description}</div>;
};
