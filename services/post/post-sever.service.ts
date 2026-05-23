import { getToken, getUser } from "@/lib/auth";
import { serverFetcher } from "@/lib/serverFetcher";
import { Post, PostResponse, PostResponsePagination } from "@/types/post";
import { Topic } from "@/types/topic";
import { redirect } from "next/navigation";

// ───────────────────────────────────────────
// SERVER-SIDE
// ───────────────────────────────────────────

export async function getPosts(
  type?: string,
  keyword?: string,
  offset?: number,
  limit?: number,
) {
  switch (type) {
    case "tag":
      return getPostsByTag(keyword || "", offset, limit);
    default:
      return getAllPosts(offset, limit);
  }
}

export async function getPostManagement(offset?: number, limit?: number) {
  const params = new URLSearchParams();
  if (offset) params.set("offset", offset.toString());
  if (limit) params.set("limit", limit.toString());

  const data = await serverFetcher<PostResponsePagination>(
    `/post/management?${params.toString()}`,
    {
      cache: "no-cache",
    },
  );
  return data.metadata;
}

export async function getAllPosts(offset?: number, limit?: number) {
  const params = new URLSearchParams();
  if (offset) params.set("offset", offset.toString());
  if (limit) params.set("limit", limit.toString());

  const data = await serverFetcher<PostResponsePagination>(
    `/post?${params.toString()}`,
    {
      cache: "no-cache",
    },
  );
  return data.metadata;
}

export async function getPostsByTag(
  tagId: string,
  offset?: number,
  limit?: number,
) {
  const params = new URLSearchParams();
  if (offset) params.set("offset", offset.toString());
  if (limit) params.set("limit", limit.toString());

  const data = await serverFetcher<PostResponsePagination>(
    `/post/tag/${tagId}?${params.toString()}`,
    {
      cache: "no-cache",
    },
  );

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
