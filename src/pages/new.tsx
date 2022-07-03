/* eslint-disable no-nested-ternary */
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { queryClient } from "./_app";

import { Layout, Button } from "@/components";
import { TournamentService } from "@/services/tournaments";

const NewTournament: NextPage = () => {
  const router = useRouter();
  const create = useMutation(TournamentService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("tournaments");
      router.replace("/");
    },
  });

  return (
    <Layout>
      <div className="flex my-10 items-center justify-between">
        <h2 className="text-2xl font-semibold">New Tournament</h2>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col col-span-12 md:col-span-8 h-min">
          <div>
            <h3 className="">Basic Info</h3>
          </div>

          <Button
            className="self-end"
            variant="warning"
            type="button"
            disabled={create.isLoading}
            onClick={() => {
              create.mutate({
                "tournament[name]": `Tournament ${new Date().toLocaleTimeString()}`,
                "tournament[description]": "lorem ipsum",
                "tournament[open_signup]": true,
                "tournament[tournament_type]": "single elimination",
              });
            }}
          >
            {create.isLoading ? "Saving Tournament..." : "Save and Continue"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NewTournament;
