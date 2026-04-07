import { getToken, getUser } from "@/lib/auth";
import { serverFetcher } from "@/lib/serverFetcher";
import { Post, PostResponse } from "@/types/post";
import { Topic } from "@/types/topic";
import { redirect } from "next/navigation";

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
  const data = await serverFetcher<PostResponse>("/post", {
    cache: "no-cache",
  });

  return data.metadata;
}

export async function getPostsByTag(
  tagId: string,
): Promise<PostResponse["metadata"]> {
  const data = await serverFetcher<PostResponse>(`/post/tag/${tagId}`, {
    cache: "no-cache",
  });

  return data.metadata;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) return null;

  const data = await serverFetcher<{ metadata: Post }>(`/post/slug/${slug}`, {
    cache: "no-cache",
  });

  return data.metadata || null;
}

export async function getListFeaturePost() {
  const data = await serverFetcher<PostResponse>("/post/feature", {
    cache: "no-cache",
  });

  return data.metadata;
}

export async function getListLatestPost() {
  const data = await serverFetcher<PostResponse>("/post/latest", {
    cache: "no-cache",
  });
  return data.metadata;
}

export async function getPostFollowingTopic(): Promise<
  {
    topic: Topic;
    posts: Post[];
  }[]
> {
  try {
    const token = await getToken();
    const data = await serverFetcher<{
      metadata: {
        topic: Topic;
        posts: Post[];
      }[];
    }>("/post/by-topic", {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data.metadata;
  } catch (error) {
    redirect("/login");
  }
}
