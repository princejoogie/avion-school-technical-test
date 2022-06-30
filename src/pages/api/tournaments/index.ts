/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { AxiosError } from "axios";

import { serverApi, serverRoutes } from "@/services/api-base";
import { getAllParams, getAllResponse } from "@/services/tournaments/get-all";
import { createTournamentParams } from "@/services/tournaments/create";
import { tournamentResponse } from "@/services/tournaments/common";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const params = await getAllParams.parseAsync(req.query);
      const response = await serverApi.get(serverRoutes.tournaments.getAll, {
        params,
      });
      const data = await getAllResponse.parseAsync(response.data);
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const params = await createTournamentParams.parseAsync(req.body);
      const response = await serverApi.post(
        serverRoutes.tournaments.create,
        null,
        { params }
      );
      const data = await tournamentResponse.parseAsync(response.data);
      return res.status(200).json(data);
    }

    return res
      .status(405)
      .json({ statusCode: 405, message: `Method [${req.method}] Not Allowed` });
  } catch (e) {
    if (e instanceof ZodError) {
      console.error(e);
      const errors = e.errors.map(
        (err) => `${err.path[err.path.length - 1]}: ${err.message}`
      );
      return res.status(400).json({
        statusCode: 400,
        message: errors.join("\n"),
      });
    }

    if (e instanceof AxiosError) {
      console.error(e);
      return res.status(400).json({ statusCode: 400, message: e.message });
    }

    const error = e as any;
    console.error(error);
    return res.status(400).json({ statusCode: 400, message: error.message });
  }
};

export default handler;
