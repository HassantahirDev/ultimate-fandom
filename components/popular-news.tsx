import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Article } from "@/lib/api"

interface PopularNewsProps {
  articles: Article[]
}

export function PopularNews({ articles }: PopularNewsProps) {
  // Only show if we have articles
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Popular News</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <article key={article.id} className="group">
            <Link href={`${article.slug}`}>
              <div className="relative aspect-video mb-3 overflow-hidden rounded-lg">
                <Image
                  src={article.featuredImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              {(article.category?.name || article.type) && (
                <Badge variant="outline" className="mb-2">
                  {article.category?.name || article.type}
                </Badge>
              )}
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-3">
                {article.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
