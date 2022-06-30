/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { UsersIcon, PuzzleIcon, ReceiptTaxIcon } from "@heroicons/react/solid";

import { Layout } from "@/components";
import { TournamentService } from "@/services/tournaments";
import { Tab, tabs, TabSwitcher } from "@/components/tournaments/tabs/switcher";

const TournamentPage: NextPage = () => {
  const [tab, setTab] = useState<Tab>("info");

  // url query params
  const router = useRouter();
  const { tournamentId } = router.query;

  // queries and mutations
  const tournament = useQuery(["tournament", { tournamentId }], () =>
    TournamentService.getById({ tournamentId: tournamentId as string })
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
              <ReceiptTaxIcon className="h-4 w-4" />
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

      <div className="w-full border-b mb-4 flex items-center space-x-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`-mb-1 group capitalize py-1 ${
              t === tab ? "text-black" : "text-gray-600"
            }`}
          >
            <p className="px-8">{t}</p>
            <div
              className={`transition-colors w-full mt-1 h-1 ${
                t === tab
                  ? "bg-green-500"
                  : "group-hover:bg-green-500/20 bg-transparent"
              }`}
            />
          </button>
        ))}
      </div>

      <TabSwitcher activeTab={tab} />
    </Layout>
  );
};

export default TournamentPage;
