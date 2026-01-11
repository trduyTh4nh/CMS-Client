import { z } from "zod";

export const commentSchema = z.object({
  user_id: z.string().min(1, "Author is required"),
  content: z.string().min(5, "Content is required"),
  post_id: z.string().uuid(),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
