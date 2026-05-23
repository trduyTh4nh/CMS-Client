"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentFormValues } from "./comment.schema";
import { useRouter } from "next/navigation";

import "./comment.css"
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


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

            <label className="w-full flex flex-col" >
                Comment
                <Textarea className="w-full border border-gray-300 rounded-md p-2" rows={4} {...register("content")} />
                {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </label>

            <Button type="submit">Post Comment</Button>
        </form>
    );
}
