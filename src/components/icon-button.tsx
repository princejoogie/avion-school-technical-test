/* eslint-disable react/button-has-type */
import React from "react";

export interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "success" | "danger" | "warning" | "info";
  children?: React.ReactNode;
}

export const IconButton = ({
  children,
  className,
  ...rest
}: IconButtonProps) => {
  return (
    <button
      {...rest}
      className={`hover:bg-gray-50 outline-none ring-0 focus:ring-2 disabled:opacity-30 disabled:cursor-not-allowed active:opacity-70 transition-opacity p-1 rounded ${className}`}
    >
      {children}
    </button>
  );
};
