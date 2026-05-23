import { serverFetcher } from "@/lib/serverFetcher";
import { DetailQandaResponse, QandaResponse } from "@/types/qanda";

export async function getAllQanda(): Promise<QandaResponse["metadata"]> {
  const data = await serverFetcher<QandaResponse>("/questions", {
    cache: "no-cache",
  });
  return data.metadata;
}

export async function getDetailQanda(
  id: string,
): Promise<DetailQandaResponse["metadata"]> {
  const data = await serverFetcher<DetailQandaResponse>(`/questions/${id}`, {
    cache: "no-cache",
  });
  return data.metadata;
}
