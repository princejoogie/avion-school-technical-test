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
  success: "bg-green-500",
  danger: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
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
      className={`text-white uppercase outline-none ring-0 focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed active:opacity-70 transition-opacity px-6 py-2 rounded ${color[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
