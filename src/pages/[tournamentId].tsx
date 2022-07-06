/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
  UsersIcon,
  DocumentTextIcon,
  ReceiptTaxIcon,
} from "@heroicons/react/solid";

import { Layout } from "@/components";
import { TournamentService } from "@/services/tournaments";
import { Tab, tabs, TabSwitcher } from "@/components/tournaments/tabs/switcher";
import { capitalize } from "@/utils";

const TournamentPage: NextPage = () => {
  const [tab, setTab] = useState<Tab>("matches");

  // url query params
  const router = useRouter();
  const { tournamentId } = router.query;

  // queries and mutations
  const tournament = useQuery(
    ["tournament", { tournamentId: Number(tournamentId) }],
    () => TournamentService.getById({ tournamentId: tournamentId as string })
  );

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

  const { name, participants_count, tournament_type, description } =
    tournament.data.tournament;

  return (
    <Layout seo={{ title: `${name} - ${capitalize(tab)}` }}>
      <div className="flex my-10 items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>

          <div className="mt-2 text-sm flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-gray-500">
            <div className="flex items-center space-x-2">
              <UsersIcon className="h-4 w-4" />
              <span className="mr-1 ml-3">{participants_count} Players</span>
            </div>

            <div className="flex items-center space-x-2">
              <ReceiptTaxIcon className="h-4 w-4" />
              <span className="mr-1 ml-3 capitalize">{tournament_type}</span>
            </div>

            <div className="flex items-center space-x-2">
              <DocumentTextIcon className="h-4 w-4" />
              <span className="mr-1 ml-3 capitalize">{description}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b mb-4 flex overflow-y-hidden items-center space-x-1">
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

      <TabSwitcher activeTab={tab} tournament={tournament.data} />
    </Layout>
  );
};

export default TournamentPage;
