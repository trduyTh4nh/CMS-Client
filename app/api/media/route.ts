import { getToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// this function for test not use
export async function GET(req: NextRequest) {
  const token = await getToken();
  const res = await fetch(`${process.env.BACKEND_URL}/media`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return NextResponse.json(await res.json(), { status: res.status });
}
