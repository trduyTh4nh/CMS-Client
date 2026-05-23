import { Button } from "@/components/ui/button";
import { getAllQanda } from "@/services/qanda/qanda-sever.service";
import { getAllTag } from "@/services/tag.service";
import Footer from "@/widget/public/homeWidget/Footer";
import TagList from "@/widget/public/homeWidget/TagList";
import QuestionList from "@/widget/public/qandaWidget/QuestionList";
import { CirclePlus } from "lucide-react";

const QuestionAndAnswerPage = async () => {

    const tags = await getAllTag()
    const qandas = await getAllQanda()
    return (
        <div className="mt-32">
            <div className="qanda flex min-h-screen justify-center  font-sans mx-52 ">
                <div className="body flex flex-col gap-5 ">
                    <h1 className="text-2xl font-bold">Q&A</h1>
                    <div className="wrap-tag-list">
                        <TagList tags={tags} ></TagList>
                    </div>
                    <div className="wrap-qanda-list">
                        <QuestionList listQuestion={qandas} />
                    </div>

                    <form action="/qanda/create">
                        <Button type="submit" className="bg-blue-600 rounded-full cursor-pointer w-12 h-12 flex items-center justify-center fixed bottom-4 right-2">
                            <CirclePlus className="scale-150" color="white" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default QuestionAndAnswerPage;
