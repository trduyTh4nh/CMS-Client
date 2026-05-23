import { serverFetcher } from "@/lib/serverFetcher";
import { Topic, TopicResponse } from "@/types/topic";

export async function getAllTopic(): Promise<TopicResponse["metadata"]> {
  const data = await serverFetcher<TopicResponse>("/topic", {
    cache: "no-cache",
  });
  return data.metadata;
}
