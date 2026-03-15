import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.BACKEND_URL}/post/increase-view/${id}`,
    { method: "PUT" },
  );

  return NextResponse.json(await res.json(), { status: res.status });
}
