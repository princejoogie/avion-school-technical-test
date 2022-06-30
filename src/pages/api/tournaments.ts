import type { NextApiRequest, NextApiResponse } from "next";

import { serverApi, serverRoutes } from "@/services/api-base";
import { tournamentOutput, tournamentParameters } from "@/services/tournaments";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = tournamentParameters.parse(req.query);
  const response = await serverApi.get(serverRoutes.tournaments, {
    params,
  });
  const data = tournamentOutput.parse(response.data);
  res.status(200).json(data);
};

export default handler;
