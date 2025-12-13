import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUser() {
  const token = (await cookies()).get("access_token")?.value;
  console.log("getUser token:", token);
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload.user;
  } catch (err) {
    console.log("JWT verification error:", err);
    return null;
  }
}
