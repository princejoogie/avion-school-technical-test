/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import type { NextPage } from "next";
import { useMutation, useQuery } from "react-query";

import { Layout } from "@/components";
import { TournamentService } from "@/services/tournaments";
import {
  TournamentState,
  tournamentStates,
} from "@/services/tournaments/common";
import { queryClient } from "@/pages/_app";
import { TournamentItem } from "@/components/tournaments";

const Home: NextPage = () => {
  const [state, setState] = useState<TournamentState>("all");
  const tournaments = useQuery("tournaments", () => TournamentService.getAll());
  const create = useMutation(TournamentService.create, {
    onSuccess: () => queryClient.invalidateQueries("tournaments"),
  });

  const filteredTournaments = tournaments.data
    ?.filter((t) => t.tournament.state === state || state === "all")
    .sort(
      (a, b) =>
        new Date(b.tournament.created_at).getTime() -
        new Date(a.tournament.created_at).getTime()
    );

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
              "tournament[name]": `Tournament ${new Date().toLocaleTimeString()}`,
              "tournament[description]": "lorem ipsum",
              "tournament[open_signup]": true,
              "tournament[tournament_type]": "single elimination",
            });
          }}
        >
          {create.isLoading ? "Creating..." : "Create a tournament"}
        </button>
      </div>

      <div className="flex items-start space-x-4 text-gray-500">
        <div className="flex-1">
          {tournaments.isLoading ? (
            <p className="text-center">Loading...</p>
          ) : filteredTournaments && filteredTournaments.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {filteredTournaments.map(({ tournament }) => (
                <TournamentItem key={tournament.id} tournament={tournament} />
              ))}
            </div>
          ) : (
            <p className="text-center">No tournaments were found.</p>
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
                  ? tournaments.data?.length ?? 0
                  : tournaments.data?.filter(
                      (t) => t.tournament.state === e.value
                    ).length ?? 0}
              </p>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
