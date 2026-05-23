import { clientFetcher } from "@/lib/clientFetcher";
// ───────────────────────────────────────────
// CLIENT-SIDE
// ───────────────────────────────────────────

export async function updateViewCount(postId: string) {
  await clientFetcher(`/post/${postId}/increase-view`, {
    method: "PUT",
  });
}

export async function createPostFromClient(data: FormData) {
  await clientFetcher("/post", {
    method: "POST",
    body: data,
  });
}

export async function getListPostFollowingTopic() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/by-topic`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token"); // ✅ Đọc được httpOnly
  return token?.value;
}
