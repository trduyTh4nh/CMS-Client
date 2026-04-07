"use client"
import { Post } from "@/types/post"
import { useRouter } from "next/navigation"


type Props = {
    featurePosts: Post[]
}
export default function FeaturePost({ featurePosts }: Props) {
    const route = useRouter()
    return (
        <div className="flex gap-4 flex-wrap">
            {featurePosts.map((post) => (
                <div
                    onClick={() => route.push(`/post/${post.slug}`)}
                    key={post.id}
                    className="w-[280px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                    <img alt={post.title} src={post.medias?.[0]?.url} className="w-full h-40 object-cover" />
                    <div className="p-3">
                        <h3 className="text-base font-semibold mb-1 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-1">{post.slug}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            <span>{post.view_count} views</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}