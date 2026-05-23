"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { useRouter } from "next/navigation";

type Props = {
    currentLimit: number,
    currentPage: number,
    tag?: string;
}

export default function LimitSelect({ currentLimit, currentPage, tag }: Props) {
    const route = useRouter();

    function handleChange(value: string) {
        const params = new URLSearchParams();
        params.set("limit", value);
        params.set("page", "1");
        if (tag) params.set("tag", tag);
        route.push(`/post?${params.toString()}`);
    }

    return (
        <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
            <Select defaultValue={String(currentLimit)} onValueChange={handleChange} >
                <SelectTrigger className="w-20" id="select-rows-per-page">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                    <SelectGroup>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    )
}