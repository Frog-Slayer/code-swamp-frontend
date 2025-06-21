import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import BlogProfile, { BlogProfileProps } from "../components/BlogProfile";
import Portfolio from "../components/Portfolio";
import { Streak } from "../components/Streak";
import BlogSidebar from "../components/Sidebar/Sidebar";
import { ActivityData, countConsecutiveDays } from "../../types/activityData";
import SectionCard from "../components/SectionCard";
import { BarChart3, BookOpen, User } from "lucide-react";
import MarkdownRenderer from "@/features/workspace/components/ArticleContent/MarkdownRenderer";

export interface BlogPageProps {
  //---Profile---//
  userid: string;

  //user info
  username: string;
  nickname: string;
  profileImage: string;
  bio: string;

  //
  company?: string;
  school?: string;

  //contact
  website?: string;
  email?: string;
  github?: string;
  linkedin?: string;

  tags: string[];

  //stats
  totalPosts: number;
  totalViews: number;
  followers: number;
  following: number;

  //---Portfolio---//
  portfolio: string;

  //---Streaks---//
  activityData: ActivityData 
}

const BlogPage = (props: BlogPageProps) => {
  const {
    userid,
    username,
    nickname,
    profileImage,
    bio,
    company,
    school,
    website,
    email,
    github,
    linkedin,
    tags,
    totalPosts,
    totalViews,
    followers,
    following,
    portfolio,
    activityData,
  } = props;

  const streak = countConsecutiveDays(activityData)

  return (
    <div className="flex">
      <SidebarProvider
        style={{
          "--sidebar-width": "20rem",
        }}
      >
        <BlogSidebar />

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
            <SectionCard title={nickname} description="" icon={User}>
                <BlogProfile
                userid={userid}
                username={username}
                nickname={nickname}
                profileImage={profileImage}
                bio={bio}
                tags={tags}
                totalPosts={totalPosts}
                totalViews={totalViews}
                streak={streak}
                followers={followers}
                following={following}
                company={company}
                school={school}
                website={website}
                email={email}
                github={github}
                linkedin={linkedin}
                />
            </SectionCard>

            <SectionCard title={"README.md"} icon={BookOpen} description={"개발자 포트폴리오 및 경력 소개"}>
                <Portfolio portfolio={portfolio}/>
            </SectionCard>

            <SectionCard title={"스트릭"} icon={BarChart3} description={""}>
                <Streak activityData={activityData} />
            </SectionCard>

          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default BlogPage;
