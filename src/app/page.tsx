import Portfolio from "@/features/user/blog/components/Portfolio";
import FeedCard, { FeedCardProps } from "@/components/ui/FeedCard/FeedCard";
import { Streak } from "@/features/user/blog/components/Streak";
import BlogProfile, { BlogProfileProps } from "@/features/user/blog/components/BlogProfile";
import BlogPage from "@/features/user/blog/screens/BlogPage";

export default function Home() {
  const testData = {
    // ---Profile---
    userid: "u123456",
    username: "youngseo",
    nickname: "박영서",
    profileImage: "https://lh3.googleusercontent.com/a/ACg8ocKLE3BwEidtEOiDjm2Ef97Yn5Skcm-JsbSQulE8Y4v12AI5eqCl=s288-c-no",
    bio: "백엔드 개발자 지망생입니다. 관심사는 Spring, Neo4j, 그리고 생산성입니다.",
  
    company: "OpenAI",
    school: "Seoul National University",
  
    // contact
    website: "https://youngseo.dev",
    email: "youngseo@example.com",
    github: "youngseo123",
    linkedin: "youngseo-profile",
  
    // tags
    tags: ["Spring", "Kotlin", "Neo4j", "Clean Architecture"],
  
    // stats
    totalPosts: 42,
    totalViews: 15893,
    followers: 122,
    following: 47,
  
    // portfolio
    portfolio: `
https://youngseo.dev/portfolio
포트폴리오
입
이니다
## 가나다

`
    ,
  
    // activity data (YYYY-MM-DD → count)
    activityData: {
      "2025-06-01": 2,
      "2025-06-02": 1,
      "2025-06-17": 3,
      "2025-06-18": 1,
      "2025-06-19": 2,
    },
  };

  return (
    <div> 
      <BlogPage {...testData}/> 
    </div>
  );
}
