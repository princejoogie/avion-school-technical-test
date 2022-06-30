import React from "react";
import { useMutation } from "react-query";

import { TournamentService } from "@/services/tournaments";
import { Tournaments } from "@/services/tournaments/get-all";
import { queryClient } from "@/pages/_app";

export const TournamentItem = ({ tournament }: Tournaments[number]) => {
  const deleteTournament = useMutation(TournamentService.deleteTournament, {
    onSuccess: () => queryClient.invalidateQueries("tournaments"),
  });

  const { name, description, full_challonge_url } = tournament;

  return (
    <div className="bg-white border items-start flex justify-between p-4 rounded-md">
      <div>
        <a
          href={full_challonge_url}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-lg"
        >
          {name}
        </a>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>

      <button
        type="button"
        disabled={deleteTournament.isLoading}
        className="text-xs text-red-500"
        onClick={() => {
          deleteTournament.mutate({
            id: `${tournament.id}`,
          });
        }}
      >
        {deleteTournament.isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};
