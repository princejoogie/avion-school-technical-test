/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { AxiosError } from "axios";

import { serverApi, serverRoutes } from "@/services/api-base";
import {
  getAllParticipantsParams,
  getAllParticipantsResponse,
} from "@/services/tournaments/participants/get-all";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tournamentId } = req.query;

  if (!tournamentId || typeof tournamentId !== "string") {
    return res.status(400).json({
      statusCode: 400,
      message: "Tournament ID is required",
    });
  }

  try {
    if (req.method === "GET") {
      const params = await getAllParticipantsParams.parseAsync(req.query);
      const response = await serverApi.get(
        serverRoutes.tournaments.participants.getAll(tournamentId),
        { params }
      );
      const data = await getAllParticipantsResponse.parseAsync(response.data);
      return res.status(200).json(data);
    }

    // if (req.method === "DELETE") {
    //   const params = await deleteTournamentParams.parseAsync(req.query);
    //   const response = await serverApi.delete(
    //     serverRoutes.tournaments.delete(params.id)
    //   );
    //   return res.status(200).json(response.data);
    // }

    return res
      .status(405)
      .json({ statusCode: 405, message: `Method [${req.method}] Not Allowed` });
  } catch (e) {
    if (e instanceof ZodError) {
      console.error(e);
      const errors = e.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
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
