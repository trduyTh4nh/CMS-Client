import { getToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const token = await getToken();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  // create form to forward to nestjs
  const forwardFormData = new FormData();
  forwardFormData.append("file", file);

  const res = await fetch(`${process.env.BACKEND_URL}/media/upload`, {
    method: "POST",
    body: forwardFormData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return NextResponse.json(await res.json(), { status: res.status });
}
