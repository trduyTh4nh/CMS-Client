"use client"

import { Tag } from "@/types/tag"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation";

type Props = {
    tags: Tag[]
}

export default function TagList({ tags }: Props) {
    const router = useRouter();
    return (
        <div>
            {tags.map((tag => (
                <Badge
                    onClick={() => router.push(`/post?tag=${tag.id}`)}
                    className="hover:bg-sky-700 hover:cursor-pointer hover:text-white transition duration-300 ease-in-out"
                    key={tag.id}
                    variant="secondary">
                    {tag.slug}
                </Badge>)))}
        </div>
    )
}