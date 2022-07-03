import { z } from "zod";

export const matchResponse = z.object({
  match: z
    .object({
      attachment_count: z.number().nullable(),
      created_at: z.string(),
      group_id: z.string().nullable(),
      has_attachment: z.boolean(),
      id: z.number(),
      identifier: z.string(),
      player1_id: z.number().nullable(),
      player2_id: z.number().nullable(),
      prerequisite_match_ids_csv: z.string(),
      round: z.number(),
      scores_csv: z.string(),
      state: z.string(),
      winner_id: z.number().nullable(),
      // TODO: add more fields
    })
    // remove this if you want to strip out unknown properties
    .passthrough(),
});

export type Match = z.infer<typeof matchResponse>;
