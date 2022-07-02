import React from "react";

import { InfoTab } from "./info";
import { MatchesTab } from "./matches";
import { ParticipantsTab } from "./participants";

import { Tournament } from "@/services/tournaments/common";

export type Tab = "info" | "participants" | "matches";

export const tabs: Tab[] = ["info", "participants", "matches"];

export interface TabSwitcherProps {
  activeTab: Tab;
  tournament: Tournament;
}

export const TabSwitcher = ({ activeTab, tournament }: TabSwitcherProps) => {
  switch (activeTab) {
    case "info":
      return <InfoTab tournament={tournament} />;
    case "participants":
      return <ParticipantsTab tournament={tournament} />;
    case "matches":
      return <MatchesTab tournament={tournament} />;
    default:
      return <InfoTab tournament={tournament} />;
  }
};
