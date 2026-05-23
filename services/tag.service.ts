import { serverFetcher } from "@/lib/serverFetcher";
import { TagResponse } from "@/types/tag";

export async function getAllTag(): Promise<TagResponse["metadata"]> {
  const data = await serverFetcher<TagResponse>("/tag", {
    cache: "no-cache",
  });
  return data.metadata;
}
