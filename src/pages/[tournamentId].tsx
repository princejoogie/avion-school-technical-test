import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "@/components";

const Tournament: NextPage = () => {
  const { tournamentId } = useRouter().query;

  return (
    <Layout>
      <div className="flex my-10 items-center justify-between">
        <h2 className="text-2xl font-semibold">Tournament {tournamentId}</h2>
      </div>
    </Layout>
  );
};

export default Tournament;
