import { Post, PostResponse } from "@/types/post";

// ───────────────────────────────────────────
// SERVER-SIDE
// ───────────────────────────────────────────

export async function getPosts(
  type?: string,
  keyword?: string,
): Promise<PostResponse["metadata"]> {
  switch (type) {
    case "tag":
      return getPostsByTag(keyword || "");
    default:
      return getAllPosts();
  }
}

export async function getAllPosts(): Promise<PostResponse["metadata"]> {
  const res = await fetch(`${process.env.BACKEND_URL}/post`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data: PostResponse = await res.json();
  return data.metadata;
}

export async function getPostsByTag(
  tagId: string,
): Promise<PostResponse["metadata"]> {
  const res = await fetch(`${process.env.BACKEND_URL}/post/tag/${tagId}`, {
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

// ───────────────────────────────────────────
// CLIENT-SIDE
// ───────────────────────────────────────────

export async function updateViewCount(postId: string) {
  const res = await fetch(`/api/post/${postId}/increase-view`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("Failed to update view count");
}

export async function createPostFromClient(data: unknown) {
  const res = await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
}
