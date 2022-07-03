import type { NextApiRequest, NextApiResponse } from "next";

import { serverApi, serverRoutes } from "@/services/api-base";
import { finalizeTournamentParams } from "@/services/tournaments/finalize";
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
    if (req.method === "POST") {
      const params = await finalizeTournamentParams.parseAsync(req.body);
      const response = await serverApi.post(
        serverRoutes.tournaments.finalize(tournamentId),
        null,
        { params }
      );
      return res.status(200).json(response.data);
    }

    return res
      .status(405)
      .json({ statusCode: 405, message: `Method [${req.method}] Not Allowed` });
  } catch (e) {
    return handleError(e, res);
  }
};

export default handler;
