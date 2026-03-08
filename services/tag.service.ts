import { TagResponse } from "@/types/tag";

export async function getAllTag(): Promise<TagResponse["metadata"]> {
  const res = await fetch(`${process.env.BACKEND_URL}/tag`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tag");
  }
  var data: TagResponse = await res.json();
  return data.metadata;
}
