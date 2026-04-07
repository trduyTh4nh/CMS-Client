import { getAllTag } from "@/services/tag.service";
import BannerV2 from "@/widget/public/homeWidget/BannerV2";
import { getListFeaturePost, getListLatestPost, getPostFollowingTopic } from "@/services/post/post-sever.service";
import LatestPost from "@/widget/public/homeWidget/LatestPost";
import FeaturePost from "@/widget/public/homeWidget/FeaturePost";
import TagList from "@/widget/public/homeWidget/TagList";
import PostByTopic from "@/widget/public/homeWidget/PostByTopic";
import Footer from "@/widget/public/homeWidget/Footer";
export default async function Home() {

  const tags = await getAllTag()
  const featurePosts = await getListFeaturePost()
  const latestPosts = await getListLatestPost()
  const postFollowingTopic = await getPostFollowingTopic()

  return (
    <div className="home flex flex-col min-h-screen justify-center  font-sans mx-52 mt-2">
      {/* Banner */}
      <BannerV2></BannerV2>
      <div className="body flex flex-col gap-5 justify-center items-center">
        <div className="mt-[52vh] wrap-tag-list">
          <TagList tags={tags} ></TagList>
        </div>

        {/* Featured */}
        <div className="wrap-post flex flex-col gap-4">
          <div className="wrap-post_title">
            <h1 className="text-2xl font-bold" >Featured</h1>
          </div>
          <div className="wrap-post_content flex justify-center gap-2 mt-2 mb-8">
            <FeaturePost featurePosts={featurePosts} />
          </div>

          <div className="wrap-post flex flex-col gap-4 w-full">
            <div className="wrap-post_title">
              <h1 className="text-2xl font-bold" >Latest</h1>
            </div>
            <div className="wrap-post_content flex gap-2 mt-2 mb-8">
              <LatestPost latestPosts={latestPosts} />
            </div>
          </div>

          <div className="wrap-post flex flex-col gap-4 w-full">
            <div className="wrap-post_content flex gap-2 mt-2 mb-8">
              <PostByTopic postFollowingTopic={postFollowingTopic} />
            </div>
          </div>

        </div>


      </div>

      <Footer />


    </div>
  );
}
