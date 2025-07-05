import Portfolio from "@/features/user/blog/components/Portfolio";
import FeedCard, { FeedCardProps } from "@/components/ui/FeedCard/FeedCard";
import { Streak } from "@/features/user/blog/components/Streak";
import BlogProfile, { BlogProfileProps } from "@/features/user/blog/components/BlogProfile";
import BlogPage from "@/features/user/blog/screens/BlogPage";
import { getRecentArticles } from "@/lib/api/article/list/getRecentArticles";
import { ArticleListItem } from "@/lib/api/article/list/type";
import RecentArticlesList from "@/features/workspace/screens/RecentArticlesList";

export default function Home() {
  return (
    <RecentArticlesList/>
  )
}
