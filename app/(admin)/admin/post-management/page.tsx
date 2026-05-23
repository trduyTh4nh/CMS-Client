import { getUser } from "@/lib/auth";
import PostForm from "./PostForm";
import PostList from "./PostList";
import "./post-management.css";
import { getAllTag } from "@/services/tag.service";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";


const PostManagementPage = async (searchParams: Promise<{
  page?: string | 0;
  limit?: string | 10;
}>) => {
  const params = await searchParams;
  const user = await getUser();
  const tags = await getAllTag();
  return (
    <main className="post-management-body w-full">
      <div className="post-management flex">
        <form action="/admin/post-management/create">
          <Button type="submit" className="bg-blue-600 rounded-full cursor-pointer w-12 h-12 flex items-center justify-center fixed bottom-4 right-2">
            <CirclePlus className="scale-150" color="white" />
          </Button>
        </form>
        <PostList />
      </div>
    </main>
  );
};

export default PostManagementPage;
