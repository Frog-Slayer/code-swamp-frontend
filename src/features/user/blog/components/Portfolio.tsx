import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MarkdownRenderer from "@/features/workspace/components/ArticleContent/MarkdownRenderer";
import { BookOpen } from "lucide-react";
import "@/features/workspace/components/ArticleContent/editor-styles.scss";

interface PortfolioProps {
  portfolio: string;
  tags: string[];
}

const Portfolio = ({ portfolio, tags }: PortfolioProps) => {
  return (
    <>
      {portfolio && (
        <Card className="glass-card border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-12 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              <div>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                  README.md
                </CardTitle>
                <CardDescription className="text-base">
                  개발자 포트폴리오 및 경력 소개
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer markdown={portfolio} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Portfolio;
