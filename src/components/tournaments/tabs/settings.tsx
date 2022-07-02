import React from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import { Tournament } from "@/services/tournaments/common";
import { Button } from "@/components";
import { TournamentService } from "@/services/tournaments";

interface SettingsTabProps {
  tournament: Tournament;
}

export const SettingsTab = ({ tournament }: SettingsTabProps) => {
  const router = useRouter();

  const deleteTournament = useMutation(TournamentService.deleteTournament, {
    onSuccess: () => {
      router.replace("/");
    },
  });

  const { description } = tournament.tournament;

  return (
    <div>
      <p>{description}</p>
      <Button
        variant="danger"
        disabled={deleteTournament.isLoading}
        onClick={() => {
          deleteTournament.mutate({ id: tournament.tournament.id.toString() });
        }}
      >
        {deleteTournament.isLoading ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};
