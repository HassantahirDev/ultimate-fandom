import Image from "next/image"
import Link from "next/link"
import { Article } from "@/lib/api"

interface ExclusiveStoriesProps {
  articles: Article[]
}

export function ExclusiveStories({ articles }: ExclusiveStoriesProps) {
  // Helper function to format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} ${days === 1 ? 'day' : 'days'} ago`
    }
  }

  // Only show if we have articles
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Exclusive Stories</h2>
        <Link href="/exclusives" className="text-brand-primary hover:text-brand-hover font-medium">
          More
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-3 mb-2">
                {article.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>By {article.author?.name || 'Anonymous'}</span>
                <span>•</span>
                <span>{formatTimeAgo(article.publishedAt || article.createdAt)}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
