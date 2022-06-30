import React from "react";

import { Container } from "./container";

export const Footer = () => {
  return (
    <footer className="w-full mt-20 p-8 border-t">
      <Container className="text-sm">
        <p className="text-center">
          © {new Date().getFullYear()} Avion School Technical Assessment
        </p>

        <p className="text-center mt-2">
          Made with ☕ by{" "}
          <a
            href="https://joogie.link/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            Prince Carlo Juguilon
          </a>
        </p>
      </Container>
    </footer>
  );
};
