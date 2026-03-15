import { getPostBySlug } from "@/services/post.service";
import PostContent from "./PostContent";
import Toc from "./Toc";
import "./post-detail.css";
import PostComments from "./PostComment";

export default async function Page({
    params,
}: {
    params: { slug: string };
}) {

    const { slug } = await params;

    const postDetail = await getPostBySlug(slug);

    if (!postDetail) {
        return <div>Post not found</div>;
    }

    return (
        <main className="post-detail">
            <article className="post-main">
                <h1>{postDetail.title}</h1>

                <div className="post-meta">
                    <span>Views: {postDetail.view_count}</span>
                    <span>
                        Created:{" "}
                        {new Date(postDetail.created_at).toLocaleDateString()}
                    </span>
                </div>

                <PostContent postId={postDetail.id} content={postDetail.content} />

                <PostComments postId={postDetail.id} />
            </article>

            <aside className="post-toc">
                <Toc content={postDetail.content} />
            </aside>
        </main>
    );
}
