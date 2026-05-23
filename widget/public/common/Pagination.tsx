import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import LimitSelect from "./LimitSelect";

type Props = {
    currentPage: number,
    totalPage: number,
    limit: number,
    tag?: string
}

function buildUrl(page: number, limit: number, tag?: string) {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (tag) params.set("tag", tag);
    return `/post?${params.toString()}`;
}

export default function PaginationComp({ currentPage, totalPage, limit, tag }: Props) {

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPage;

    return (
        <div className="flex items-center justify-between gap-4 mt-6">
            <LimitSelect currentLimit={limit} currentPage={currentPage} tag={tag} />
            <span className="text-sm">
                Pages {currentPage} / {totalPage}
            </span>
            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={hasPrev ? buildUrl(currentPage - 1, limit, tag) : "#"}
                            aria-disabled={!hasPrev}
                            className={!hasPrev ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href={hasNext ? buildUrl(currentPage + 1, limit, tag) : "#"}
                            aria-disabled={!hasNext}
                            className={!hasNext ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}