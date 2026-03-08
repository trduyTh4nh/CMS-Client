import { getAllTag } from "@/services/tag.service";
import Banner from "@/widget/public/homeWidget/Banner";
import TagList from "./TagList";
import BannerV2 from "@/widget/public/homeWidget/BannerV2";
export default async function Home() {

  const tags = await getAllTag()
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      {/* <Banner></Banner> */}
      <BannerV2></BannerV2>
      <div className="mt-[52vh]">
        <TagList tags={tags} ></TagList>
      </div>

    </div>
  );
}
