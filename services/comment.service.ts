import { CommentResponse } from "@/types/comment";

export async function getCommentByPost(params: {
  postId: string;
}): Promise<CommentResponse["metadata"]> {
  const { postId } = params;
  const res = await fetch(`${process.env.BACKEND_URL}/comment/post/${postId}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    {
      throw new Error("Failed to fetch comments");
    }
  }

  const data: CommentResponse = await res.json();
  return data.metadata;
}
