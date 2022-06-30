import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { clientRoutes, clientApi } from "../api-base";

export const getAllParams = z
  .object({
    state: z.enum(["all", "pending", "in_progress", "complete"]).optional(),
    type: z
      .enum([
        "single_elimination",
        "double_elimination",
        "round_robin",
        "swiss",
      ])
      .optional(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    subdomain: z.string().optional(),
  })
  .optional();

export type GetAllParams = z.infer<typeof getAllParams>;

export const getAllResponse = z.array(
  z.object({
    tournament: z
      .object({
        created_at: z.string(),
        description: z.string(),
        full_challonge_url: z.string().url(),
        game_name: z.string().nullable(),
        id: z.number(),
        live_image_url: z.string().url(),
        name: z.string(),
        state: z.enum(["all", "pending", "in_progress", "complete"]),
        updated_at: z.string(),
        url: z.string(),
        // TODO: add more fields
      })
      // remove this if you want to strip out unknown properties
      .passthrough(),
  })
);

export type Tournaments = z.infer<typeof getAllResponse>;

export const getAll = async (params?: GetAllParams) => {
  try {
    const response = await clientApi.get<Tournaments>(
      clientRoutes.tournaments.getAll,
      { params }
    );
    return response.data;
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(e.message);
    }

    if (e instanceof AxiosError) {
      throw new Error(e.message);
    }

    throw e;
  }
};
