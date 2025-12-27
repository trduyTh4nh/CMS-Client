"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormValues } from "./post.schema";
import "./post-management.css";


const DEFAULT_AUTHOR_ID = "0b6baefb-570d-4a3c-9bd2-ae728c69dea3";

export default function PostForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            status: "DRAFT",
            convert_url: null,
            author_id: DEFAULT_AUTHOR_ID,
        },
    });

    const title = watch("title");

    const onSubmit = async (data: PostFormValues) => {
        console.log("Submit post:", data);
        const res = await fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            // Handle success (e.g., show a message, reset form, etc.)
            console.log("Post created successfully");
        }
    };

    return (
        <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                Title
                <input {...register("title")} />
                {errors.title && <p className="text-red-400">{errors.title.message}</p>}
            </label>

            <label>
                Slug
                <input
                    {...register("slug")}
                    placeholder={title?.toLowerCase().replace(/\s+/g, "-")}
                />
                {errors.slug && <p className="text-red-400">{errors.slug.message}</p>}
            </label>

            <label>
                Content
                <textarea rows={10} {...register("content")} />
                {errors.content && <p className="text-red-400">{errors.content.message}</p>}
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
