import { getPosts } from "@/services/post.service";
import "./post-management.css";

export default async function PostList() {
    const posts = await getPosts();

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

            <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.title}</td>

                        <td>
                            <span className={`status ${post.status.toLowerCase()}`}>
                                {post.status}
                            </span>
                        </td>

                        <td>{post.view_count}</td>

                        <td>
                            <button className="btn btn-edit">Edit</button>
                            <button className="btn btn-delete">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
