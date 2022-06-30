import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

import { Layout } from "@/components";
import { TournamentService } from "@/services/tournaments";

const Tournament: NextPage = () => {
  const router = useRouter();
  const { tournamentId } = router.query;

  if (!tournamentId || typeof tournamentId !== "string") {
    return <div>Tournament ID is required</div>;
  }

  const tournament = useQuery(["tournament", { tournamentId }], () =>
    TournamentService.getById({ tournamentId })
  );

  const deleteTournament = useMutation(TournamentService.deleteTournament, {
    onSuccess: () => {
      router.replace("/");
    },
  });

  return (
    <Layout>
      <div className="flex my-10 items-center justify-between">
        <h2 className="text-2xl font-semibold">Tournament {tournamentId}</h2>
        <button
          type="button"
          onClick={() => {
            deleteTournament.mutate({ id: tournamentId });
          }}
        >
          Delete
        </button>
      </div>

      <pre>{JSON.stringify(tournament.data ?? {}, null, 2)}</pre>
    </Layout>
  );
};

export default Tournament;
