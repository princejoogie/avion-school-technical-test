import { z } from "zod";

export const tournamentResponse = z.object({
  tournament: z
    .object({
      created_at: z.string(),
      description: z.string(),
      full_challonge_url: z.string().url(),
      game_name: z.string().nullable(),
      id: z.number(),
      live_image_url: z.string().url(),
      name: z.string(),
      state: z.enum([
        "all",
        "pending",
        "underway",
        "complete",
        "awaiting_review",
      ]),
      updated_at: z.string(),
      url: z.string(),
      participants_count: z.number(),
      completed_at: z.string().nullable(),
      tournament_type: z.string(),
      // TODO: add more fields
    })
    // remove this if you want to strip out unknown properties
    .passthrough(),
});

export type Tournament = z.infer<typeof tournamentResponse>;
