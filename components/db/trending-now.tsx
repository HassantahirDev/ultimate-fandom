import Link from "next/link"
import { TrendingUp, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Article {
  id: string
  title: string
  slug: string
  type: 'news' | 'review' | 'feature' | 'interview' | 'opinion' | 'list'
  viewCount?: number
  category?: {
    id: string
    name: string
    slug: string
  }
  author?: {
    name: string
  }
}

interface TrendingNowProps {
  articles: Article[]
}

const formatViewCount = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

export function TrendingNow({ articles }: TrendingNowProps) {
  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-primary" />
          Trending Now
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {articles.map((article, index) => (
          <Link key={article.id} href={`${article.slug}`}>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-muted rounded-full flex items-center justify-center text-sm font-bold text-brand-primary">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-brand-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  {article.category && (
                    <p className="text-sm text-muted-foreground">
                      {article.category.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {article.viewCount && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>{formatViewCount(article.viewCount)}</span>
                  </div>
                )}
                {article.author && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {article.author.name}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
