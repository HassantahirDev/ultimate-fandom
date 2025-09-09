import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Article } from "@/lib/api"

interface FeaturedSectionProps {
  featuredArticle?: Article
  secondaryArticles: Article[]
}

export function FeaturedSection({ featuredArticle, secondaryArticles }: FeaturedSectionProps) {
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

  // Only show if we have data
  if (!featuredArticle && secondaryArticles.length === 0) {
    return null
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="lg:col-span-2">
            <Link href={`${featuredArticle.slug}`} className="group block">
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                <Image
                  src={featuredArticle.featuredImage || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <Badge variant="secondary" className="mb-2">
                {featuredArticle.category?.name || featuredArticle.type}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                {featuredArticle.title}
              </h1>
            </Link>
          </div>
        )}

        {/* Secondary Articles */}
        {secondaryArticles.length > 0 && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Trending Now</h2>
            </div>

            {secondaryArticles.slice(0, 4).map((article, index) => (
              <article key={article.id} className="group">
                <Link href={`${article.slug}`} className="flex space-x-4">
                  <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded">
                    <Image 
                      src={article.featuredImage || "/placeholder.svg"} 
                      alt={article.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="mb-1 text-xs">
                      {article.category?.name || article.type}
                    </Badge>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                      <span>By {article.author?.name || 'Anonymous'}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(article.publishedAt || article.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
