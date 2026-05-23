import { Qanda } from "@/types/qanda"
import Link from "next/link"


type Props = {
    listQuestion: Qanda[]
}

export default function QuestionList({ listQuestion }: Props) {

    return (
        <div className="w-full">
            {listQuestion.map((question) => (
                <div key={question.id} className="py-4 border-b border-gray-200">
                    <h2 className="m-0 text-[1.5rem] break-all">
                        <Link
                            href={`/qanda/${question.id}`}
                            className="no-underline text-gray-900 hover:underline"
                        >
                            {question.title}
                        </Link>
                    </h2>
                </div>
            ))}
        </div>
    )

}