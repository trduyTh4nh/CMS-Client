"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentFormValues } from "./comment.schema";
import { useRouter } from "next/navigation";

import "./comment.css"
import { useEffect } from "react";


type Props = {
    user?: any;
    postId?: string;
};

export default function CommentForm({ user, postId }: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            user_id: user?.id || "",
            content: "",
            post_id: postId || "",
        },
    });

    useEffect(() => {
        if (user?.id) {
            setValue("user_id", user.id, { shouldValidate: true });
            setValue("post_id", postId || "", { shouldValidate: true });
        }
    }, [user, setValue]);
    const onSubmit = async (data: CommentFormValues) => {
        const res = await fetch("/api/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            reset();
            router.refresh();
        }
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
            <h3>Leave a comment</h3>

            <label>
                Comment
                <textarea rows={4} {...register("content")} />
                {errors.content && <p>{errors.content.message}</p>}
            </label>

            <button type="submit">Post Comment</button>
        </form>
    );
}
