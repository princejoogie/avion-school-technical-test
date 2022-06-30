import React from "react";
import Link from "next/link";
import { UsersIcon, CheckIcon } from "@heroicons/react/solid";

import { Tournaments } from "@/services/tournaments/get-all";
import { tournamentStates } from "@/services/tournaments";

const StateTag = ({ state }: { state?: string }) => {
  const stateFound = tournamentStates.find((s) => s.value === state);
  if (!state || !stateFound) return null;
  const { label, style } = stateFound;

  return (
    <span
      className={`rounded-full px-3 py-1 inline text-[0.6rem] text-white ${style}`}
    >
      {label}
    </span>
  );
};

export const TournamentItem = ({ tournament }: Tournaments[number]) => {
  const {
    state,
    id,
    name,
    full_challonge_url,
    participants_count,
    completed_at,
    tournament_type,
    game_name,
  } = tournament;

  return (
    <Link href={`/${id}`}>
      <div className="bg-white border items-start flex justify-between p-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
        <div>
          <a
            href={full_challonge_url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-lg"
          >
            {name}
          </a>
          <p className="capitalize text-sm text-neutral-500">
            {tournament_type} {game_name}
          </p>
        </div>

        <div className="text-xs text-gray-500 flex flex-col items-end">
          <div className="flex items-center">
            <StateTag state={state} />
            <span className="mr-1 ml-3">{participants_count}</span>
            <UsersIcon className="h-4 w-4" />
          </div>

          {completed_at && (
            <div className="flex space-x-1 mt-4 items-center">
              <CheckIcon className="h-4 w-4" />
              <p>{new Date(completed_at).toDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
