import React, { useState } from "react";
import { useMutation } from "react-query";

import { Button } from "@/components/button";
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
        <div className="flex items-center space-x-4 text-sm">
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            placeholder="Display name"
            className="bg-gray-50 w-full px-3 py-2 border rounded"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email or Username"
            className="bg-gray-50 w-full px-3 py-2 border rounded"
          />
        </div>

        <Button
          disabled={!displayName || !email || createParticipant.isLoading}
          type="submit"
          className="px-6 uppercase"
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
