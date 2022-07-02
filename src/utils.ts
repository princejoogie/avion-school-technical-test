/* eslint-disable no-console */
import { NextApiResponse } from "next";
import { ZodError } from "zod";
import { AxiosError } from "axios";

export const handleError = (e: unknown, res: NextApiResponse) => {
  if (e instanceof ZodError) {
    const errors = e.errors.map(
      (err) => `${err.path.join(".")}: ${err.message}`
    );
    console.error(errors);
    return res.status(400).json({
      statusCode: 400,
      message: errors.join("\n"),
    });
  }

  if (e instanceof AxiosError) {
    if (e.response?.data.errors) {
      return res.status(400).json({
        statusCode: 400,
        message: e.message,
        errors: e.response.data.errors,
      });
    }
    return res.status(400).json({ statusCode: 400, message: e.message });
  }

  const error = e as any;
  console.log(error);
  return res.status(400).json({ statusCode: 400, message: error.message });
};

export const capitalize = (s: string) => {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
};
