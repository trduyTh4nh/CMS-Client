import { clientFetcher } from "@/lib/clientFetcher";
// ───────────────────────────────────────────
// CLIENT-SIDE
// ───────────────────────────────────────────

export async function updateViewCount(postId: string) {
  await clientFetcher(`/post/${postId}/increase-view`, {
    method: "PUT",
  });
}

export async function createPostFromClient(data: unknown) {
  await clientFetcher("/post", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
