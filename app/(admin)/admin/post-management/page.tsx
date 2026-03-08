import { getUser } from "@/lib/auth";
import PostForm from "./PostForm";
import PostList from "./PostList";
import "./post-management.css";

const PostManagementPage = async () => {
  const user = await getUser();
  return (
    <main className="post-management">
      <PostList />

      <section className="post-form-section">
        <h2>Create / Edit Post</h2>
        <PostForm user={user} />
      </section> 
    </main>
  );
};

export default PostManagementPage;
