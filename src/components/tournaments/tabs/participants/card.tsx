import React, { useState } from "react";
import { useMutation } from "react-query";
import { PencilIcon, TrashIcon, CogIcon, XIcon } from "@heroicons/react/solid";

import { Button, TextInput, IconButton } from "@/components";
import { Participant } from "@/services/tournaments/participants/common";
import { ParticipantsService } from "@/services/tournaments/participants";
import { Tournament } from "@/services/tournaments/common";
import { queryClient } from "@/pages/_app";

export interface ParticipantCardProps {
  tournament: Tournament;
  participant: Participant;
}

export const ParticipantCard = ({
  participant,
  tournament,
}: ParticipantCardProps) => {
  const { name, seed, attached_participatable_portrait_url } =
    participant.participant;
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(name);

  const updateParticipant = useMutation(ParticipantsService.update, {
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries([
        "participants",
        { tournamentId: tournament.tournament.id.toString() },
      ]);
    },
  });

  const deleteParticipant = useMutation(ParticipantsService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "participants",
        { tournamentId: tournament.tournament.id.toString() },
      ]);
      queryClient.invalidateQueries([
        "tournament",
        { tournamentId: tournament.tournament.id.toString() },
      ]);
    },
  });

  return (
    <div className="bg-white border rounded-md py-2">
      <div className="flex items-center px-4 justify-between">
        <div className="flex items-center">
          <span className="bg-gray-50 font-semibold border rounded px-4 mr-2">
            {seed}
          </span>
          <div className="inline-flex items-center space-x-1">
            {attached_participatable_portrait_url ? (
              <img
                className="h-8 w-8 rounded-full"
                src={attached_participatable_portrait_url}
                alt={name}
              />
            ) : (
              <div className="uppercase h-8 grid place-items-center w-8 rounded-full bg-gray-300">
                {name[0] ?? "?"}
              </div>
            )}
            <span>{name}</span>
          </div>
        </div>

        <div className="text-gray-500 flex items-center space-x-1">
          {tournament.tournament.state === "pending" && (
            <>
              <IconButton
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (isEditing) {
                    setDisplayName(name);
                  }
                }}
              >
                {isEditing ? (
                  <XIcon className="w-4 h-4" />
                ) : (
                  <PencilIcon className="w-4 h-4" />
                )}
              </IconButton>

              <IconButton
                disabled={isEditing || deleteParticipant.isLoading}
                onClick={() => {
                  deleteParticipant.mutate({
                    tournamentId: tournament.tournament.id.toString(),
                    participantId: participant.participant.id.toString(),
                  });
                }}
              >
                {deleteParticipant.isLoading ? (
                  <CogIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <TrashIcon className="w-4 h-4" />
                )}
              </IconButton>
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <>
          <hr className="my-2" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateParticipant.mutate({
                tournamentId: tournament.tournament.id.toString(),
                participantId: participant.participant.id.toString(),
                "participant[name]": displayName,
              });
            }}
            className="px-4 text-sm flex items-center space-x-2"
          >
            <TextInput
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name"
              className="w-full md:w-1/2"
            />

            <Button
              type="submit"
              disabled={!displayName || updateParticipant.isLoading}
            >
              {updateParticipant.isLoading ? "Saving..." : "Save"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
