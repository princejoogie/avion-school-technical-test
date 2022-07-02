/* eslint-disable react/button-has-type */
import React from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "success" | "danger" | "warning" | "info";
  children?: React.ReactNode;
}

const color = {
  success: "bg-green-500 focus:ring-green-800",
  danger: "bg-red-500 focus:ring-red-800",
  warning: "bg-yellow-500 focus:ring-yellow-800",
  info: "bg-blue-500 focus:ring-blue-800",
};

export const Button = ({
  children,
  className,
  variant = "success",
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`text-white outline-none ring-0 focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed active:opacity-70 transition-opacity px-4 py-2 rounded ${color[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
