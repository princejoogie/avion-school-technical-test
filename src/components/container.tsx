import React from "react";

export interface ContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
}

export const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div
      {...rest}
      className={`max-w-6xl container px-4 mx-auto w-full ${className}`}
    >
      {children}
    </div>
  );
};
