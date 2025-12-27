import PostForm from "./PostForm";
import PostList from "./PostList";
import "./post-management.css";

const PostManagementPage = () => {
  return (
    <main className="post-management">
      <section className="post-list-section">
        <h2>Posts</h2>
        <PostList />
      </section>

      <section className="post-form-section">
        <h2>Create / Edit Post</h2>
        <PostForm />
      </section>
    </main>
  );
};

export default PostManagementPage;
