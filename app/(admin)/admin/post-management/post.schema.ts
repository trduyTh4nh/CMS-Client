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
  tags: z.array(z.string()).optional(),
  thumbnail: z
    .custom<FileList>((val) => val instanceof FileList || val === undefined)
    .optional(),
});

// Input type: what the form fields hold (used with useForm<>
export type PostFormValues = z.input<typeof postSchema>;

// Output type: what onSubmit receives after Zod transforms (e.g. FileList → File | null)
export type PostFormOutput = z.output<typeof postSchema>;
