import Link from "next/link";
import { getPosts } from "@/services/post/post-sever.service";
import "./post.css";
import PaginationComp from "@/widget/public/common/Pagination";

type Props = {
    searchParams: Promise<{
        tag?: string;
        page?: string | 0;
        limit?: string | 10;
    }>;
}

const Post = async ({ searchParams }: Props) => {

    const params = await searchParams;

    const tagId = params.tag;
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Number(params.limit) || 10;
    const offset = (page - 1) * limit;


    const result = tagId
        ? await getPosts("tag", tagId, offset, limit)
        : await getPosts(undefined, undefined, offset, limit);

    const totalPage = Math.ceil(result.total / result.limit);

    return (
        <main className="post-page">
            {!result || result.posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <div className="post-list">
                    <ul className="post-list mt-6">
                        {result.posts.map((post) => (
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
                    {result.posts.length != 0 && <PaginationComp currentPage={page} totalPage={totalPage} limit={limit} tag={tagId} />}
                </div>
            )}
        </main>
    );
};

export default Post;
