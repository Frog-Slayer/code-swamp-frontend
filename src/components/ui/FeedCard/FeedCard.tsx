import { Eye, Heart } from "lucide-react";
import Link from "next/link";
import { Badge } from "../badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { useRouter } from "next/navigation";

export interface FeedCardProps{
  fullPath: string
  thumbnail: string
  title: string
  summary: string

  publishedAt: string
  views: number
  likes: number
  tags: string[]

  author: string
  nickname: string
  authorAvatar: string
}


const FeedCard = ({ post } : { post: FeedCardProps}) => {
  const router = useRouter()

  const handleClick = () => { 
    router.push(post.fullPath)
  }


    return (
        <div key={post.fullPath} onClick={handleClick} className = "cursor-pointer">
          <Card key={post.fullPath} className="group hover-lift glass-card overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
              <img
                src={post.thumbnail || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">{post.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-sm">
                <Link href ={`/${post.author}`}>
                  <img src={post.authorAvatar}/>
                </Link>
                <span>{post.nickname}</span>
                <span>•</span>
                <span>{post.publishedAt}</span>
              </CardDescription>
            </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{post.summary}</p>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </div>
                </div>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedCard;
