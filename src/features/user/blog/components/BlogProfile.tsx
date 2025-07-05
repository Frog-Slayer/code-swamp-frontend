import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Code, Github, Globe, Linkedin } from "lucide-react";
import { ElementType } from "react";

export interface BlogProfileProps {
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
  streak: number;
  followers: number;
  following: number;
}

const SocialLink = ({
  href,
  icon: Icon,
  label,
  muted,
}: {
  href: string;
  icon: ElementType;
  label: string;
  muted?: boolean;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-1 hover:underline ${
        muted ? "text-muted-foreground hover:text-primary" : "text-primary"
      }`}
    >
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </a>
  );
};

const Stat = ({ value, tag }: { value: number; tag: string }) => {
  return (
    <div className="text-center">
      <div className="text-xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{tag}</div>
    </div>
  );
};

const BlogProfile = (user: BlogProfileProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full m-4">
      {/* Profile Info */}
      <div className="flex flex-col space-x-3 sm:flex-row gap-4 items-start lg:items-center flex-1">
        <div className="relative">
          <Avatar className="w-40 h-40 ">
            <AvatarImage
              src={user.profileImage || "/placeholder.svg"}
              alt={user.nickname}
            />
            <AvatarFallback className="w-full h-full flex items-center justify-center text-2xl font-bold bg-muted text-muted-foreground">
              {user.nickname.charAt(0)}
            </AvatarFallback>
            </Avatar>
        </div>

        <div className="space-y-3 flex-1">
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.nickname}</h1>
              <p className="text-xl text-muted-foreground mb-1">
                @{user.username}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            {user.website && (
              <SocialLink href={user.website} icon={Globe} label="Website" />
            )}

            {user.github && (
              <SocialLink
                href={`https://github.com/${user.github}`}
                icon={Github}
                label="GitHub"
                muted
              />
            )}

            {user.linkedin && (
              <SocialLink
                href={`https://linkedin.com/in/${user.linkedin}`}
                icon={Linkedin}
                label="LinkedIn"
                muted
              />
            )}
          </div>

          {/* Skills/Interests - Integrated */}
          {user.tags.length !== 0 && (
            <div className="pt-3 border-t border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold">주요 기술</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {user.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-2 py-1 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats - Moved to bottom */}
      <div className="mt-6 pt-4 border-t border-border/30">
        <div className="grid grid-cols-4 gap-4">
          <Stat tag="팔로워" value={user.followers}></Stat>
          <Stat tag="총 조회수" value={user.totalViews}></Stat>
          <Stat tag="포스트" value={user.totalPosts}></Stat>
          <Stat tag="연속 활동" value={user.streak}></Stat>
        </div>
      </div>
    </div>
  );
};

export default BlogProfile;
