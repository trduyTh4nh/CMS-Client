import Link from "next/link";
import { getPosts } from "@/services/post/post-sever.service";
import "./post.css";

type Props = {
    searchParams: Promise<{
        tag?: string;
    }>;
}

const Post = async ({ searchParams }: Props) => {
    const params = await searchParams;
    const tagId = params.tag;
    let posts = [];
    if (tagId) {
        posts = await getPosts("tag", tagId);
    } else {
        posts = await getPosts();
    };

    return (
        <main className="post-page">
            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <ul className="post-list">
                    {posts.map((post) => (
                        <li key={post.id} className="post-item">
                            <h2 className="post-title">
                                <Link href={`/post/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </h2>

                            <div className="post-meta">
                                <span>Status: {post.status}</span>
                                <span>Views: {post.view_count}</span>
                                <span>Votes: {post.vote_count}</span>
                                <span>
                                    Created:{" "}
                                    {new Date(post.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default Post;
