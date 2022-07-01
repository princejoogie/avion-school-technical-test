import { z } from "zod";

export const participantResponse = z.object({
  participant: z
    .object({
      active: z.boolean(),
      attached_participatable_portrait_url: z.string().nullable(),
      can_check_in: z.boolean(),
      challonge_username: z.string().nullable(),
      checked_in: z.boolean(),
      created_at: z.string(),
      display_name: z.string(),
      id: z.number(),
      invitation_pending: z.boolean(),
      name: z.string(),
      on_waiting_list: z.boolean(),
      removable: z.boolean(),
      seed: z.number(),
      tournament_id: z.number(),
      updated_at: z.string(),
      username: z.string().nullable(),
      // TODO: add more fields
      // remove this if you want to strip out unknown properties
    })
    .passthrough(),
});

export type Participant = z.infer<typeof participantResponse>;
