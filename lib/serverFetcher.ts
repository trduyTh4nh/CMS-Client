import { redirect } from "next/navigation";
import { getToken } from "./auth";

type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function serverFetcher<T>(
  path: string,
  options?: FetchOptions,
): Promise<T> {
  try {
    const token = await getToken();

    const res = await fetch(`${process.env.BACKEND_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    });

    if (!res.ok) {
      console.error(`API server error ${path}: ${res.status}`);
      redirect("/login");
    }
    return res.json();
  } catch (error) {
    console.error(`API server error ${path}: ${error}`);
    redirect("/sever-error");
  }
}
