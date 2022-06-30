/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import type { NextPage } from "next";
import { useMutation, useQuery } from "react-query";

import { Layout } from "@/components";
import { TournamentService } from "@/services/tournaments";
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
        className="text-xs text-red-500"
        onClick={() => {
          deleteTournament.mutate({
            id: `${tournament.id}`,
          });
        }}
      >
        Delete
      </button>
    </div>
  );
};

const Home: NextPage = () => {
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
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            create.mutate({
              "tournament[name]": "Test Tournament 2",
              "tournament[description]": "Test Tournament 2",
              "tournament[open_signup]": true,
              "tournament[tournament_type]": "single elimination",
            });
          }}
        >
          Create a tournament
        </button>
      </div>

      {tournaments.data ? (
        <div className="flex flex-col space-y-4">
          {tournaments.data.map(({ tournament }) => (
            <TournamentItem key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default Home;
