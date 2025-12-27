import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/media`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      return NextResponse.json({
        message: "Bad Request",
        status: 404,
      });
    }

    const data = await res.json();

    console.log("Media response: ", data);

    return res;
    
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
