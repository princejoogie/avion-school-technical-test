import type { NextApiRequest, NextApiResponse } from "next";

import { serverApi, serverRoutes } from "@/services/api-base";
import { getAllParams, getAllResponse } from "@/services/tournaments/get-all";
import {
  createTournamentParams,
  createTournamentResponse,
} from "@/services/tournaments/create";
import { deleteTournamentParams } from "@/services/tournaments/delete";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const params = getAllParams.parse(req.query);
    const response = await serverApi.get(serverRoutes.tournaments.getAll, {
      params,
    });
    const data = getAllResponse.parse(response.data);
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const params = createTournamentParams.parse(req.body);
    const response = await serverApi.post(
      serverRoutes.tournaments.create,
      null,
      { params }
    );
    const data = createTournamentResponse.parse(response.data);
    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const params = deleteTournamentParams.parse(req.query);
    const response = await serverApi.delete(
      serverRoutes.tournaments.delete(params.id)
    );
    return res.status(200).json(response.data);
  }

  return res
    .status(405)
    .json({ statusCode: 405, message: "Method Not Allowed" });
};

export default handler;
