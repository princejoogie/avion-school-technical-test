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
      // TODO: add more fields
    })
    // remove this if you want to strip out unknown properties
    .passthrough(),
});

export type Match = z.infer<typeof matchResponse>;
