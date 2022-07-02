import type { NextApiRequest, NextApiResponse } from "next";

import { serverApi, serverRoutes } from "@/services/api-base";
import { getAllParams, getAllResponse } from "@/services/tournaments/get-all";
import { createTournamentParams } from "@/services/tournaments/create";
import { tournamentResponse } from "@/services/tournaments/common";
import { handleError } from "@/utils";

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
      return res.status(201).json(data);
    }

    return res
      .status(405)
      .json({ statusCode: 405, message: `Method [${req.method}] Not Allowed` });
  } catch (e) {
    return handleError(e, res);
  }
};

export default handler;
