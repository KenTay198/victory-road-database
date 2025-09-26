import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export type Handler = (
  req: NextApiRequest
) => Promise<NextResponse> | NextResponse;

export const applyMiddleware = (
  middleware: (req: NextApiRequest, next: Handler) => Promise<NextResponse>,
  handler: Handler
) => {
  return async (req: NextApiRequest): Promise<NextResponse> => {
    return middleware(req, handler);
  };
};
