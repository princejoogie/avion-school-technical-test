import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

import { Participant } from "@/services/tournaments/participants/common";
import { IconButton } from "@/components/icon-button";
import { Button, TextInput } from "@/components";

export interface ParticipantCardProps {
  participant: Participant;
}

export const ParticipantCard = ({ participant }: ParticipantCardProps) => {
  const { name, seed } = participant.participant;
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(name);

  return (
    <div className="bg-white border rounded-md py-2">
      <div className="flex items-center px-4 justify-between">
        <div>
          {seed} - {name}
        </div>

        <div className="text-gray-500 flex items-center space-x-1">
          <IconButton
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) {
                setDisplayName(name);
              }
            }}
          >
            <PencilIcon className="w-4 h-4" />
          </IconButton>
          <IconButton>
            <TrashIcon className="w-4 h-4" />
          </IconButton>
        </div>
      </div>

      {isEditing && (
        <>
          <hr className="my-2" />
          <div className="px-4 text-sm flex items-center space-x-2">
            <TextInput
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name"
              className="w-full md:w-1/2"
            />

            <Button>Save</Button>
          </div>
        </>
      )}
    </div>
  );
};
