import Link from "next/link";
import { getPosts } from "@/services/post.service";
import "./post.css";

const PostPage = async () => {
    const posts = await getPosts();
    return (
        <main className="post-page">
            <h1>Posts</h1>

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

export default PostPage;
