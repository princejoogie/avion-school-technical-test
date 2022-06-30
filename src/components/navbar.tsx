import React from "react";

export interface NavbarProps {
  title?: string;
}

export const Navbar = ({ title = "Challonge" }: NavbarProps) => {
  return (
    <nav className="bg-white w-full p-8 border-b sticky top-0 bg-opacity-90">
      <h1 className="font-bold text-2xl">{title}</h1>
    </nav>
  );
};