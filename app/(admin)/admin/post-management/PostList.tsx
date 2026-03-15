import { getAllPosts } from "@/services/post.service";
import "./post-management.css";

export default async function PostList() {
    const posts = await getAllPosts();

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
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td >{post.title}</td>

                        <td>
                            <span className={`status ${post.status.toLowerCase()}`}>
                                {post.status}
                            </span>
                        </td>

                        <td>{post.view_count}</td>

                        <td className="">
                            <button className="btn btn-edit bg-green-600 rounded-2xl">Publish</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
