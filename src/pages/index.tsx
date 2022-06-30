import React, { useState } from "react";
import type { NextPage } from "next";
import { useMutation, useQuery } from "react-query";

import { Layout } from "@/components";
import {
  TournamentService,
  TournamentState,
  tournamentStates,
} from "@/services/tournaments";
import { queryClient } from "@/pages/_app";
import { Tournaments } from "@/services/tournaments/get-all";

const TournamentItem = ({ tournament }: Tournaments[number]) => {
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

const Home: NextPage = () => {
  const [state, setState] = useState<TournamentState>("all");
  const tournaments = useQuery("tournaments", () =>
    TournamentService.getAll({
      state: "all",
    })
  );
  const create = useMutation(TournamentService.create, {
    onSuccess: () => queryClient.invalidateQueries("tournaments"),
  });

  return (
    <Layout>
      <div className="flex my-10 items-center justify-between">
        <h2 className="text-2xl font-semibold">Your tournaments</h2>
        <button
          type="button"
          disabled={create.isLoading}
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            create.mutate({
              "tournament[name]": `Test Tournament ${new Date().getTime()}`,
              "tournament[description]": "Test Tournament 2",
              "tournament[open_signup]": true,
              "tournament[tournament_type]": "single elimination",
            });
          }}
        >
          {create.isLoading ? "Creating..." : "Create a tournament"}
        </button>
      </div>

      <div className="flex items-start space-x-4">
        <div className="flex-1">
          {tournaments.data ? (
            <div className="flex flex-col space-y-4">
              {tournaments.data
                .sort(
                  (a, b) =>
                    new Date(b.tournament.updated_at).getTime() -
                    new Date(a.tournament.updated_at).getTime()
                )
                .filter((t) => t.tournament.state === state || state === "all")
                .map(({ tournament }) => (
                  <TournamentItem key={tournament.id} tournament={tournament} />
                ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="flex flex-col items-start">
          {tournamentStates.map((e) => (
            <button
              type="button"
              key={e.value}
              onClick={() => setState(e.value)}
              className={`px-4 text-gray-500 text-sm py-2 rounded-md border w-full flex items-center justify-between ${
                e.value === state
                  ? "bg-white border-gray-200"
                  : "border-transparent"
              }`}
            >
              <p className="text-left flex-1 mr-28">{e.label}</p>
              <p>
                {e.value === "all"
                  ? tournaments.data?.length
                  : tournaments.data?.filter(
                      (t) => t.tournament.state === e.value
                    ).length}
              </p>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
