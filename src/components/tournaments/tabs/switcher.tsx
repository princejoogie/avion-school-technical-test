import React from "react";

import { InfoTab } from "./info";
import { MatchesTab } from "./matches";
import { ParticipantsTab } from "./participants";

export type Tab = "info" | "participants" | "matches";

export const tabs: Tab[] = ["info", "participants", "matches"];

export interface TabSwitcherProps {
  activeTab: Tab;
}

export const TabSwitcher = ({ activeTab }: TabSwitcherProps) => {
  switch (activeTab) {
    case "info":
      return <InfoTab />;
    case "participants":
      return <ParticipantsTab />;
    case "matches":
      return <MatchesTab />;
    default:
      return <InfoTab />;
  }
};
