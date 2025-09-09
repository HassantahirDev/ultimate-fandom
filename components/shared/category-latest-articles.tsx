import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface LatestArticle {
  title: string
  category: string
  author: string
  time: string
  excerpt: string
  image: string
  href: string
}

interface CategoryLatestArticlesProps {
  title: string
  articles: LatestArticle[]
  filterTabs?: string[]
  loadMoreText?: string
}

export function CategoryLatestArticles({ 
  title, 
  articles, 
  filterTabs = ["All"],
  loadMoreText = "Load More Articles"
}: CategoryLatestArticlesProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex space-x-4 text-sm">
          {filterTabs.map((tab, index) => (
            <button 
              key={index}
              className={index === 0 
                ? "font-medium text-brand-primary border-b-2 border-brand-primary pb-1" 
                : "text-gray-600 hover:text-brand-primary"
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {articles.map((article, index) => (
          <article key={index} className="group flex space-x-4">
            <Link href={article.href} className="flex-shrink-0">
              <div className="relative w-32 h-20 overflow-hidden rounded-lg">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={article.href}>
                <Badge variant="outline" className="mb-2">
                  {article.category}
                </Badge>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>By {article.author}</span>
                  <span>•</span>
                  <span>{article.time}</span>
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          {loadMoreText}
        </Button>
      </div>
    </section>
  )
} 