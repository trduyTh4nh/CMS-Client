type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function clientFetcher<T>(
  path: string,
  options?: FetchOptions,
): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const res = await fetch(`/api/${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });

  if (!res.ok) throw new Error(`API client error ${path}: ${res.status}`);
  return res.json();
}
