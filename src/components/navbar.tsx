/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";

export interface NavbarProps {
  title?: string;
}

export const Navbar = ({ title = "Chall0nge" }: NavbarProps) => {
  return (
    <nav className="bg-white w-full p-8 border-b sticky top-0 bg-opacity-90">
      <Link href="/">
        <a>
          <h1 className="font-mono font-bold text-2xl">{title}</h1>
        </a>
      </Link>
    </nav>
  );
};
