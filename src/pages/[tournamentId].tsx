/* eslint-disable no-nested-ternary */
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { UsersIcon, PuzzleIcon } from "@heroicons/react/solid";

import { Layout } from "@/components";
import { TournamentService } from "@/services/tournaments";

const TournamentPage: NextPage = () => {
  // url query params
  const router = useRouter();
  const { tournamentId } = router.query;

  if (!tournamentId || typeof tournamentId !== "string") {
    return <div>Tournament ID is required</div>;
  }

  // queries and mutations
  const tournament = useQuery(["tournament", { tournamentId }], () =>
    TournamentService.getById({ tournamentId })
  );

  const deleteTournament = useMutation(TournamentService.deleteTournament, {
    onSuccess: () => {
      router.replace("/");
    },
  });

  if (tournament.isLoading) {
    return (
      <Layout>
        <h2 className="my-10 text-center">Loading...</h2>
      </Layout>
    );
  }

  if (!tournament.data) {
    return (
      <Layout>
        <h2 className="my-10 text-center">Tournament not found</h2>
      </Layout>
    );
  }

  const { name, participants_count, tournament_type, game_name } =
    tournament.data.tournament;

  return (
    <Layout>
      <div className="flex my-10 items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>

          <div className="mt-2 text-sm flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-2">
              <UsersIcon className="h-4 w-4" />
              <span className="mr-1 ml-3">{participants_count} Players</span>
            </div>

            <div className="flex items-center space-x-2">
              <UsersIcon className="h-4 w-4" />
              <span className="mr-1 ml-3 capitalize">{tournament_type}</span>
            </div>

            <div className="flex items-center space-x-2">
              <PuzzleIcon className="h-4 w-4" />
              <span
                className={`mr-1 ml-3 ${
                  game_name === null
                    ? "italic text-gray-400"
                    : "not-italic text-gray-500"
                }`}
              >
                {game_name ?? "Game not specified"}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            deleteTournament.mutate({ id: tournamentId });
          }}
        >
          Delete
        </button>
      </div>

      <div className="w-full border-b pb-4">
        <div>Nav</div>
      </div>
    </Layout>
  );
};

export default TournamentPage;
