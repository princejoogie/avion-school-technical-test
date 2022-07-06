/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Link from "next/link";
import { UsersIcon, CheckIcon } from "@heroicons/react/solid";

import { Tag } from "../tag";

import { Tournament } from "@/services/tournaments/common";
import { queryClient } from "@/pages/_app";
import { TournamentService } from "@/services/tournaments";

export const TournamentItem = ({ tournament }: Tournament) => {
  const [hovered, setHovered] = useState(false);

  const {
    state,
    id,
    name,
    participants_count,
    completed_at,
    tournament_type,
    game_name,
  } = tournament;

  return (
    <Link href={`/${id}`}>
      <a
        onMouseOver={() => {
          if (!hovered) {
            setHovered(true);
            queryClient.prefetchQuery(
              ["tournament", { tournamentId: id }],
              () => TournamentService.getById({ tournamentId: id.toString() })
            );
          }
        }}
        className="bg-white border items-start flex justify-between p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <div>
          <h4 className="text-black font-semibold text-lg">{name}</h4>
          <p className="capitalize text-sm text-neutral-500">
            {tournament_type} {game_name}
          </p>
        </div>

        <div className="text-xs text-gray-500 flex flex-col items-end">
          <div className="flex items-center">
            <Tag state={state} />
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
      </a>
    </Link>
  );
};
