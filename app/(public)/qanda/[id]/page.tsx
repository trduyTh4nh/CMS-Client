import { getDetailQanda } from "@/services/qanda/qanda-sever.service";

type Props = {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    const qanda = await getDetailQanda(id);
    console.log("id: ", id)
    return (
        <div className="mt-32">
            <h1>{qanda.title}</h1>
            <p>{qanda.content}</p>
        </div>
    );
}