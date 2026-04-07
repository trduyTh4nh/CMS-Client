"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormValues } from "./post.schema";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";
import { createPostFromClient } from "@/services/post/post-client.service";
import { uploadMedia } from "@/services/media/media-client.service";

export default function PostForm({ user }: { user: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: "DRAFT",
      convert_url: null,
      author_id: "",
    },
  });

  useEffect(() => {
    if (user?.id) {
      setValue("author_id", user.id, { shouldValidate: true });
    }
  }, [user, setValue]);

  const title = watch("title");

  const onSubmit = async (data: PostFormValues) => {
    await createPostFromClient(data);
  };

  return (
    <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("author_id")} />

      <label>
        Title
        <input {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </label>

      <label>
        Slug
        <input
          {...register("slug")}
          placeholder={title?.toLowerCase().replace(/\s+/g, "-")}
        />
        {errors.slug && <p>{errors.slug.message}</p>}
      </label>

      <label>
        Content
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={field.value}
              onEditorChange={field.onChange}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image',
                  'charmap', 'preview', 'anchor', 'searchreplace',
                  'visualblocks', 'code', 'fullscreen', 'insertdatetime',
                  'media', 'table', 'help', 'wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | image | removeformat | help',

                image_title: true,
                automatic_uploads: true,
                file_picker_types: 'image',

                images_upload_handler: async (blobInfo: any) => {
                  return await uploadMedia(blobInfo.blob());
                },
              }}
            />
          )}
        />
        {errors.content && <p>{errors.content.message}</p>}
      </label>

      <label>
        Status
        <select {...register("status")}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </label>

      <button type="submit">Save Post</button>
    </form>
  );
}
