/* eslint-disable no-console */
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

import { clientRoutes, clientApi } from "../api-base";

import { tournamentResponse } from "./common";

import { ErrorData } from "@/types";

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

export const getAllResponse = z.array(tournamentResponse);

export type GetAllResponse = z.infer<typeof getAllResponse>;

export const getAll = async (params?: GetAllParams) => {
  try {
    const response = await clientApi.get<GetAllResponse>(
      clientRoutes.tournaments.getAll,
      { params }
    );
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data as ErrorData;
      toast.error(error.message);
      console.error(e);
      return [];
    }

    const error = e as any;
    toast.error(`${error.message}`);
    console.error(e);
    return [];
  }
};
