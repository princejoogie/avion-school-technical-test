/* eslint-disable no-console */
import { NextApiResponse } from "next";
import { ZodError } from "zod";
import { AxiosError } from "axios";

export const handleError = (e: unknown, res: NextApiResponse) => {
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
};
