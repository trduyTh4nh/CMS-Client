import { cookies } from "next/headers";
import { getToken } from "./auth";

type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function serverFetch<T>(
  path: string,
  options?: FetchOptions,
): Promise<T> {
  const token = await getToken();

  const res = await fetch(`${process.env.BACKEND_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchClient<T>(
  path: string,
  options?: FetchOptions,
): Promise<T> {
  const res = await fetch(`/api/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
