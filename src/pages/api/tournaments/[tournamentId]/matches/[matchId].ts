import type { NextApiRequest, NextApiResponse } from "next";

import { serverApi, serverRoutes } from "@/services/api-base";
import { updateMatchParams } from "@/services/tournaments/matches/update";
import { handleError } from "@/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tournamentId, matchId } = req.query;

  if (!matchId || typeof matchId !== "string") {
    return res.status(400).json({
      statusCode: 400,
      message: "Participant ID is required",
    });
  }

  if (!tournamentId || typeof tournamentId !== "string") {
    return res.status(400).json({
      statusCode: 400,
      message: "Tournament ID is required",
    });
  }

  try {
    if (req.method === "PUT") {
      const params = await updateMatchParams.parseAsync(req.body);
      const response = await serverApi.put(
        serverRoutes.tournaments.matches.update(tournamentId, matchId),
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
