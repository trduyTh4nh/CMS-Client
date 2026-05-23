import PostForm from "../PostForm";
import { getUser } from "@/lib/auth";
import { getAllTag } from "@/services/tag.service";
import "../post-management.css";
export default async function CreatePost() {
    const user = await getUser();
    const tags = await getAllTag();
    return (
        <main className="post-management-body w-full mt-10">
            <h1 className="text-2xl font-bold mb-4">New Post</h1>
            <div className="">
                <PostForm user={user} tags={tags} />
            </div>
        </main>
    )
}