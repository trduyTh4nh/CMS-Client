"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormValues } from "./post.schema";
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { createPostFromClient } from "@/services/post/post-client.service";
import { uploadMedia } from "@/services/media/media-client.service";
import { Tag } from "@/types/tag";
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


type Props = {
  user: any,
  tags: Tag[],
  className?: string
}

export default function PostForm({ user, tags, className }: Props) {

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

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
      tags: [],
      thumbnail: undefined,
    },
  });

  useEffect(() => {
    if (user?.id) {
      setValue("author_id", user.id, { shouldValidate: true });
    }
  }, [user, setValue]);

  const title = watch("title");

  const onSubmit = async (data: PostFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    formData.append("status", data.status);
    formData.append("author_id", data.author_id);
    formData.append("tags", data.tags?.join(",") || "");
    formData.append("thumbnail", data.thumbnail?.item(0) || "");
    await createPostFromClient(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  }

  return (
    <section className={`${className} post-form-section mb-2`}>
      <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="post-header flex gap-4">
          <div className="post-header-left flex-2 ">
            <label>
              Title
              <Input type="hidden" {...register("author_id")} />
              <Input {...register("title")} />
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </label>
            <label>
              Slug
              <Input
                {...register("slug")}
                placeholder={title?.toLowerCase().replace(/\s+/g, "-")}
              />
              {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
            </label>
          </div>
          <div className="post-header-right-thumbnail flex-1" >
            <label>
              Thumbnail
              <Input type="file" {...register("thumbnail")} onChange={handleImageChange} />
              {errors.thumbnail && <FieldError>{errors.thumbnail.message}</FieldError>}
              {/* Preview thumbnail */}
              {thumbnailPreview && (
                <img src={thumbnailPreview} alt="Thumbnail" />
              )}
            </label>
          </div>
        </div>

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
          {errors.content && <FieldError>{errors.content.message}</FieldError>}
        </label>

        <label className="mt-4">
          <Field className="w-full flex">
            <FieldLabel className="items-start">Status</FieldLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <FieldError>{errors.status.message}</FieldError>}
          </Field>
        </label>

        <label className="mt-4">
          <Field className="w-full flex gap-2">
            <FieldLabel className="items-start">Tags</FieldLabel>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.[0] || ""}
                  onValueChange={(value) => field.onChange([value])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {tags.map((tag) => (
                        <SelectItem key={tag.id} value={tag.id}>
                          {tag.slug}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tags && <FieldError>{errors.tags.message}</FieldError>}
          </Field>
        </label>

        <Button className="mt-4" type="submit">Save Post</Button>
      </form>
    </section>
  );
}
