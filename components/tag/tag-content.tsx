import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Article {
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
  href: string
}

interface TagPageContentProps {
  articles: Article[]
}

export function TagPageContent({ articles }: TagPageContentProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            All
          </Button>
          <Button variant="ghost" size="sm">
            Movies
          </Button>
          <Button variant="ghost" size="sm">
            TV
          </Button>
          <Button variant="ghost" size="sm">
            News
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <Link href={article.href}>
              <CardContent className="p-0">
                <div className="flex gap-6">
                  <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <Badge variant="outline" className="mb-2">
                      {article.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>By {article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>
    </div>
  )
}
