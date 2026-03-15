import { getCommentByPost } from "@/services/comment.service";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";



export default async function PostComments({ postId }: { postId: string }) {

    const user = await getUser();
    const comments = await getCommentByPost({ postId });

    if (!user) {
        redirect("/unauthorized");
    }
    return (
        <section className="post-comments">
            <CommentForm postId={postId} user={user} />
            <CommentList comments={comments} />
        </section>
    );
}
