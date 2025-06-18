import Portfolio from "@/features/user/blog/components/Portfolio";
import FeedCard, { FeedCardProps } from "@/components/ui/FeedCard/FeedCard";
import { Streak } from "@/features/user/blog/components/Streak";
import BlogProfile, { BlogProfileProps } from "@/features/user/blog/components/BlogProfile";

export default function Home() {
  const post : FeedCardProps ={
    fullPath: "full",
    thumbnail: "thumb",
    title: "title",
    summary: "string",
    publishedAt: "2025-06-19",
    views: 100,
    likes: 100,
    tags: ["Kotlin"],
    author: "@reunai",
    nickname: "박영서",
    authorAvatar: "-"
  }

  const activityData =  {
    "2025-01-01": 2,
    "2025-01-02": 1,
    "2025-01-03": 3,
    "2025-01-05": 1,
    "2025-01-08": 2,
    "2025-01-15": 4,
    "2025-01-20": 2,
    "2025-01-25": 3,
    "2025-02-01": 1,
    "2025-02-05": 2,
  }

  const user : BlogProfileProps = {
    userid: "123",
    username: "reunai",
    nickname: "박영서dldldldldld",
    profileImage: "",
    bio: "hello",
    tags: ["hi"],
    totalPosts: 10,
    totalViews: 100,
    github: "frog_slayer",
    streak: 1000,
    followers: 99,
    following: 100
  }

  return (
    <div> 
      <BlogProfile user={user}/>
      <Streak activityData={activityData}/>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeedCard post={post}/>
      </div>
    </div>
  );
}
