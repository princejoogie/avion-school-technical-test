import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

export interface SelectProps<T> {
  onChange: (value: T) => void;
  optionLabel: (option: T) => string | undefined;
  options: T[];
  value: T;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  horizontal?: boolean;
}

export const Select = <T,>({
  options,
  value,
  onChange,
  optionLabel,
  disabled = false,
  multiple = false,
  horizontal = false,
  placeholder = "Select an option",
}: SelectProps<T>) => {
  return (
    <Listbox
      {...{
        disabled,
        multiple,
        horizontal,
        value,
        onChange,
      }}
    >
      <div className="relative mt-1">
        <Listbox.Button className="hover:cursor-pointer border ring-0 rounded-md relative w-full cursor-default bg-gray-50 py-2 pl-3 pr-10 text-left outline-none focus:ring-2">
          {({ open }) => (
            <>
              <span className="block truncate">
                {value ? optionLabel(value) : placeholder}
              </span>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </span>
            </>
          )}
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-50 absolute mt-1 border max-h-60 w-full overflow-auto rounded-md bg-gray-50 py-1 outline-none">
            {options.map((option, i) => (
              <Listbox.Option
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className={({ active }) =>
                  `relative cursor-default select-none hover:cursor-pointer py-2 pl-4 pr-10 ${
                    active ? "bg-gray-200" : "text-gray-500"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {optionLabel(option)}
                    </span>

                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
