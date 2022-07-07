/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "react-query";
import { UsersIcon } from "@heroicons/react/solid";

import { Layout, Tag, tournamentStates } from "@/components";
import { TournamentService } from "@/services/tournaments";
import { TournamentState } from "@/services/tournaments/common";
import { TournamentItem } from "@/components/tournaments";

const Home: NextPage = () => {
  const [state, setState] = useState<TournamentState>("all");
  const tournaments = useQuery(
    "tournaments",
    () => TournamentService.getAll(),
    { refetchOnWindowFocus: false }
  );

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
        <Link href="/new">
          <a className="text-blue-500 hover:bg-gray-100 active:opacity-70 px-4 py-2 rounded">
            + Create a tournament
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-4 text-gray-500">
        <div className="col-span-12 md:col-span-8 h-min">
          {!tournaments.isError ? (
            <div
              className={`flex flex-col space-y-4 ${
                tournaments.isRefetching
                  ? "opacity-50 animate-pulse"
                  : "opacity-100"
              }`}
            >
              {tournaments.isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, idx) => (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={`skeleton-${idx}`}
                        className="bg-white animate-pulse text-gray-200 border items-start flex justify-between p-4 rounded-md"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg w-3/4 text-gray-100 bg-gray-100 rounded">
                            Loading name
                          </h3>
                          <p className="mt-1 capitalize bg-gray-200 rounded w-1/2 text-sm">
                            Hello
                          </p>
                        </div>

                        <div className="text-xs flex flex-col items-end">
                          <div className="flex items-center">
                            <Tag state="none" />
                            <span className="mr-1 ml-3 rounded bg-gray-200">
                              00
                            </span>
                            <UsersIcon className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    ))
                : filteredTournaments?.map((tournament) => (
                    <TournamentItem
                      key={tournament.tournament.id}
                      tournament={tournament}
                    />
                  ))}
            </div>
          ) : (
            <p className="text-center">No tournaments were found.</p>
          )}
        </div>

        <div className="col-span-12 md:col-span-4 h-min">
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
              <p className="text-left flex-1">{e.label}</p>
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
