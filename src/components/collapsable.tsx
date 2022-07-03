import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

export interface CollapsableProps {
  title: string;
  children: React.ReactNode;
  initialOpen?: boolean;
  containerClassname?: string;
  buttonClassname?: string;
}

export const Collapsable = ({
  title,
  children,
  initialOpen = false,
  containerClassname = "",
  buttonClassname,
}: CollapsableProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className={`w-full ${containerClassname}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gray-100 w-full active:bg-opacity-70 transition-opacity px-4 border py-2 rounded-md flex items-center justify-between ${buttonClassname}`}
      >
        <h3>{title}</h3>
        <ChevronDownIcon
          className={`h-6 w-6 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && children && <div className="ml-4">{children}</div>}
    </div>
  );
};
