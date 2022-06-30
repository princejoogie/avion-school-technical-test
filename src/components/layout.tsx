import React from "react";
import Head from "next/head";

import { Container } from "./container";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export interface LayoutProps {
  children: React.ReactNode;
  navTitle?: string;
  seo?: {
    title: string;
    description: string;
  };
  className?: string;
}

export const Layout = ({ children, navTitle, seo, className }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{seo?.title ?? "Challonge"}</title>
        <meta
          name="description"
          content={seo?.description ?? "Avion School Technical Assessment"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar title={navTitle} />
        <Container className={`flex-1 ${className}`}>{children}</Container>
        <Footer />
      </main>
    </>
  );
};
