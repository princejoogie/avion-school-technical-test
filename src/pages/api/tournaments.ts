import type { NextApiRequest, NextApiResponse } from "next";

import { apiClient } from "@/services/api-client";
import { tournamentOutput, tournamentParameters } from "@/services/tournaments";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = tournamentParameters.parse(req.query);
  const response = await apiClient.get("/tournaments.json", {
    params,
  });
  const data = tournamentOutput.parse(response.data);
  res.status(200).json(data);
};

export default handler;
