import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and dash separated"),
  content: z.string().min(10, "Content is too short"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  author_id: z.string().uuid(),
  convert_url: z.string().nullable(),
});

export type PostFormValues = z.infer<typeof postSchema>;
