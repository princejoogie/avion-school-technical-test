import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, TextInput, Select } from "@/components";
import { TournamentService } from "@/services/tournaments";
import {
  newTournamenSchema,
  NewTournamentSchema,
  Tournament,
  tournamentTypes,
} from "@/services/tournaments/common";
import { queryClient } from "@/pages/_app";

interface SettingsTabProps {
  tournament: Tournament;
}

export const SettingsTab = ({ tournament }: SettingsTabProps) => {
  const router = useRouter();

  const deleteTournament = useMutation(TournamentService.deleteTournament, {
    onSuccess: () => {
      router.replace("/");
    },
  });

  const update = useMutation(TournamentService.update, {
    onSuccess: () =>
      queryClient.invalidateQueries([
        "tournament",
        { tournamentId: tournament.tournament.id.toString() },
      ]),
  });

  const { description, name, tournament_type, id } = tournament.tournament;

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields: touched, isValid },
  } = useForm<NewTournamentSchema>({
    resolver: zodResolver(newTournamenSchema),
    mode: "all",
    shouldFocusError: true,
    defaultValues: {
      tournamentName: name,
      tournamentDescription: description,
      openSignup: true,
      tournamentType: tournament_type as NewTournamentSchema["tournamentType"],
    },
  });

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <form
          onSubmit={handleSubmit((values) => {
            update.mutate({
              tournamentId: id.toString(),
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
            disabled={update.isLoading || !isValid}
          >
            {update.isLoading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>

      <Button
        className="mt-8"
        variant="danger"
        type="button"
        disabled={deleteTournament.isLoading}
        onClick={() => {
          deleteTournament.mutate({ id: tournament.tournament.id.toString() });
        }}
      >
        {deleteTournament.isLoading
          ? "Deleting tournament..."
          : "Delete tournament"}
      </Button>
    </div>
  );
};
