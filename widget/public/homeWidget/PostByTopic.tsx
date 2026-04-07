import { Post } from "@/types/post"
import Link from "next/link";
import { Topic } from "@/types/topic";

type Props = {
    postFollowingTopic: {
        topic: Topic;
        posts: Post[];
    }[]
}

const PostByTopic = ({ postFollowingTopic }: Props) => {
    return (
        <div>
            {postFollowingTopic.map((item, index) => (
                <div key={index} className="wrap-post flex flex-col gap-4 w-full">
                    <div className="wrap-post_title">
                        <h1 className="text-2xl font-bold" >{item.topic.name}</h1>
                    </div>
                    <div className="wrap-post_content flex flex-col gap-2 mt-2 mb-8">
                        {item.posts.map((post) => (
                            <div key={post.id} className="py-4 border-b border-gray-200">
                                <h2 className="m-0 text-[1.5rem] break-all">
                                    <Link
                                        href={`/post/${post.slug}`}
                                        className="no-underline text-gray-900 hover:underline"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostByTopic