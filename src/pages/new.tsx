import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "./_app";

import { Layout, Button, TextInput, Select } from "@/components";
import { TournamentService } from "@/services/tournaments";
import {
  newTournamenSchema,
  NewTournamentSchema,
  tournamentTypes,
} from "@/services/tournaments/common";

const NewTournament: NextPage = () => {
  const router = useRouter();
  const create = useMutation(TournamentService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("tournaments");
      router.replace("/");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields: touched, isValid },
  } = useForm<NewTournamentSchema>({
    resolver: zodResolver(newTournamenSchema),
    mode: "all",
    shouldFocusError: true,
    defaultValues: {
      tournamentName: "",
      tournamentDescription: "",
      openSignup: true,
      tournamentType: "single elimination",
    },
  });

  return (
    <Layout>
      <div className="flex my-10 items-center justify-between">
        <h2 className="text-2xl font-semibold">New Tournament</h2>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <form
          onSubmit={handleSubmit((values) => {
            create.mutate({
              "tournament[name]": values.tournamentName,
              "tournament[description]": values.tournamentDescription,
              "tournament[open_signup]": values.openSignup,
              "tournament[tournament_type]": values.tournamentType,
            });
          })}
          className="bg-white border p-4 rounded-md flex flex-col col-span-12 md:col-span-8 h-min"
        >
          <div>
            <h3 className="font-semibold text-lg uppercase">Basic Info</h3>

            <div className="mt-2">
              <p className="text-gray-700 text-sm">Tournament Name</p>
              <Controller
                control={control}
                name="tournamentName"
                render={({ field: { ref, ...rest } }) => (
                  <TextInput className="mt-1" {...rest} />
                )}
              />
              {touched.tournamentName && errors.tournamentName && (
                <span className="text-red-500 text-xs">
                  Error: {errors.tournamentName.message}
                </span>
              )}
            </div>

            <div className="mt-2">
              <p className="text-gray-700 text-sm">Description</p>
              <Controller
                control={control}
                name="tournamentDescription"
                render={({ field: { ref, ...rest } }) => (
                  <TextInput className="mt-1" {...rest} />
                )}
              />
              {touched.tournamentDescription &&
                errors.tournamentDescription && (
                  <span className="text-red-500 text-xs">
                    Error: {errors.tournamentDescription.message}
                  </span>
                )}
            </div>

            <div className="mt-2">
              <p className="text-gray-700 text-sm">Type</p>
              <Controller
                control={control}
                name="tournamentType"
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    options={tournamentTypes}
                    optionLabel={(e) => e}
                  />
                )}
              />
              {touched.tournamentType && errors.tournamentType && (
                <span className="text-red-500 text-xs">
                  Error: {errors.tournamentType.message}
                </span>
              )}
            </div>
          </div>

          <Button
            className="self-end mt-6"
            variant="warning"
            type="submit"
            disabled={create.isLoading || !isValid}
          >
            {create.isLoading ? "Saving Tournament..." : "Save and Continue"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default NewTournament;
