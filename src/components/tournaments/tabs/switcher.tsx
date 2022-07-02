import React from "react";

import { SettingsTab } from "./settings";
import { MatchesTab } from "./matches";
import { ParticipantsTab } from "./participants";

import { Tournament } from "@/services/tournaments/common";

export type Tab = "settings" | "participants" | "matches";

export const tabs: Tab[] = ["matches", "participants", "settings"];

export interface TabSwitcherProps {
  activeTab: Tab;
  tournament: Tournament;
}

export const TabSwitcher = ({ activeTab, tournament }: TabSwitcherProps) => {
  switch (activeTab) {
    case "settings":
      return <SettingsTab tournament={tournament} />;
    case "participants":
      return <ParticipantsTab tournament={tournament} />;
    case "matches":
      return <MatchesTab tournament={tournament} />;
    default:
      return <SettingsTab tournament={tournament} />;
  }
};
