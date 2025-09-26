import { NextResponse } from "next/server";
import { applyMiddleware } from "@/middleware";
import isAuth from "@/middleware/isAuth";

export const GET = applyMiddleware(isAuth, (req) => {
  return NextResponse.json(req.user, { status: 200 });
});
