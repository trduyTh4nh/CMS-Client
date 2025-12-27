import { Post, PostResponse } from "@/types/post";

export async function getPosts(): Promise<PostResponse["metadata"]> {
  const res = await fetch(`${process.env.BACKEND_URL}/post`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data: PostResponse = await res.json();
  return data.metadata;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (slug === undefined) {
    return null;
  }

  const res = await fetch(`${process.env.BACKEND_URL}/post/slug/${slug}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  const data = await res.json();
  return data.metadata || null;
}
