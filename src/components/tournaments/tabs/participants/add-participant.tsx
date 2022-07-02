import React, { useState } from "react";
import { useMutation } from "react-query";

import { Button, TextInput } from "@/components";
import { ParticipantsService } from "@/services/tournaments/participants";
import { queryClient } from "@/pages/_app";

export interface AddParticipantCardProps {
  tournamentId: string;
}

export const AddParticipantCard = ({
  tournamentId,
}: AddParticipantCardProps) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const createParticipant = useMutation(ParticipantsService.create, {
    onSuccess: () => {
      setDisplayName("");
      setEmail("");
      queryClient.invalidateQueries([
        "participants",
        { tournamentId: Number(tournamentId) },
      ]);
      queryClient.invalidateQueries([
        "tournament",
        { tournamentId: tournamentId.toString() },
      ]);
    },
  });

  return (
    <div className="p-4 border rounded-md bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createParticipant.mutate({
            tournamentId,
            "participant[name]": displayName,
            "participant[email]": email,
          });
        }}
        className="flex items-center space-x-6"
      >
        <div className="flex items-center space-x-2 text-sm">
          <TextInput
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display name"
          />
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Username"
          />
        </div>

        <Button
          disabled={!displayName || !email || createParticipant.isLoading}
          type="submit"
        >
          {createParticipant.isLoading ? "Adding..." : "Add"}
        </Button>
      </form>

      {createParticipant.isError && (
        <p className="text-red-500 text-xs mt-2">
          {(createParticipant.error as any).message}
        </p>
      )}
    </div>
  );
};
