import type { NextApiRequest, NextApiResponse } from "next";

import { serverApi, serverRoutes } from "@/services/api-base";
import {
  getAllMatchesParams,
  getAllMatchesResponse,
} from "@/services/tournaments/matches/get-all";
import { handleError } from "@/utils";

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
      const params = await getAllMatchesParams.parseAsync(req.query);
      const response = await serverApi.get(
        serverRoutes.tournaments.matches.getAll(tournamentId),
        { params }
      );
      const data = await getAllMatchesResponse.parseAsync(response.data);
      return res.status(200).json(data);
    }

    return res
      .status(405)
      .json({ statusCode: 405, message: `Method [${req.method}] Not Allowed` });
  } catch (e) {
    return handleError(e, res);
  }
};

export default handler;
