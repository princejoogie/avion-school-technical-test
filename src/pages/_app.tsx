import React from "react";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <Toaster position="top-right" containerClassName="text-xs" />
    </>
  );
};

export default App;
