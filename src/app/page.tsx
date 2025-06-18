import Portfolio from "@/features/user/blog/components/Portfolio";
import FeedCard, { FeedCardProps } from "@/components/ui/FeedCard/FeedCard";

export default function Home() {
  const post : FeedCardProps =  { 
    fullPath: "",
    thumbnail: "thumb",
    title: "title",
    summary: "summary",

    publishedAt: "now",
    views: 5,
    likes: 10,
    tags: ["hello"],

    nickname: "nick",
    authorAvatar: "avatar"
  }


  return (
    <div> 
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeedCard post={post}/>
      </div>
    </div>
  );
}
