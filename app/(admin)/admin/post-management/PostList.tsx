import { getAllPosts, getPostManagement, getPosts } from "@/services/post/post-sever.service";
import "./post-management.css";
import PaginationComp from "@/widget/public/common/Pagination";
import { Button } from "@/components/ui/button";

type Props = {
    searchParams?: {
        page?: string | 0;
        limit?: string | 100;
    };
}

export default async function PostList({ searchParams }: Props) {
    const params = searchParams;

    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Number(params?.limit) || 100;
    const offset = (page - 1) * limit;

    const posts = await getPostManagement(offset, limit);

    const totalPage = Math.ceil(posts.total / posts.limit);

    return (
        <table className="post-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody className="">
                {posts.posts.map((post) => (
                    <tr key={post.id}>
                        <td >{post.title}</td>

                        <td>
                            <span className={`status ${post.status.toLowerCase()}`}>
                                {post.status}
                            </span>
                        </td>

                        <td>{post.view_count}</td>

                        <td className="">
                            <Button className="btn btn-edit bg-green-600 rounded-2xl">Publish</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
