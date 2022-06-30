import React, { useEffect } from "react";
import Head from "next/head";
import type { NextPage } from "next";

import { getTournaments } from "@/services/tournaments";

const Home: NextPage = () => {
  useEffect(() => {
    getTournaments().then(console.log);
  }, []);

  return (
    <div>
      <Head>
        <title>Avion School Assessment</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-3xl container px-4 mx-auto w-full">
        <h1 className="text-center mt-4 text-2xl font-semibold">Hello World</h1>
      </main>
    </div>
  );
};

export default Home;
