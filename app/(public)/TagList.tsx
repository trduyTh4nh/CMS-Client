import { Tag } from "@/types/tag"
import { Badge } from "@/components/ui/badge"

type Props = {
    tags: Tag[]
}

export default function TagList({ tags }: Props) {
    return (
        <div>
            {tags.map((tag => (<Badge  key={tag.id} variant="secondary">{tag.slug}</Badge>)))}
        </div>
    )
}