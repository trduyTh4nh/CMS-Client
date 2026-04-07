"use client"
import { Post } from "@/types/post"
import Link from "next/link"

type Props = {
    latestPosts: Post[]
}

export default function LatestPost({ latestPosts }: Props) {
    return (
        <div className="w-full">
            {latestPosts.map((post) => (
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
    );
}