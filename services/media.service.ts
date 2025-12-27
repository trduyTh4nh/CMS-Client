import { MediaResponse } from "@/types/media";

export async function getBanners(): Promise<MediaResponse["metadata"]> {
  const res = await fetch(`${process.env.BACKEND_URL}/media`, {
    // cache: "no-store",
    next: {revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch banners");
  }

  const data: MediaResponse = await res.json();

  return data.metadata;
}
