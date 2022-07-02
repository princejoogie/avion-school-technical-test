import React from "react";

export const TextInput = ({
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <input
      {...rest}
      type="text"
      className={`bg-gray-50 outline-none ring-0 focus:ring-2 w-full px-3 py-2 border rounded ${className}`}
    />
  );
};
