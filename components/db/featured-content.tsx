import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HtmlContentViewer } from "@/components/ui/html-content-viewer"
import { Calendar, Clock, Eye } from "lucide-react"

interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  status: 'published' | 'draft'
  type: 'news' | 'review' | 'feature' | 'interview' | 'opinion' | 'list'
  featuredImage?: string
  featuredImageCaption?: string
  publishedAt?: string
  author?: {
    name: string
  }
  category?: {
    id: string
    name: string
    slug: string
  }
  tags?: { id: string; name: string; slug: string }[]
  createdAt: string
  updatedAt: string
  viewCount?: number
  isBreaking?: boolean
  isFeatured?: boolean
}

interface FeaturedContentProps {
  articles: Article[]
}

const getTypeColor = (type: string) => {
  const colors = {
    news: 'bg-blue-500',
    review: 'bg-purple-500',
    feature: 'bg-green-500',
    interview: 'bg-orange-500',
    opinion: 'bg-red-500',
    list: 'bg-yellow-500'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const getReadingTime = (content: string) => {
  const wordsPerMinute = 200
  const words = content.split(' ').length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min`
}

const formatViewCount = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

export function FeaturedContent({ articles }: FeaturedContentProps) {
  if (!articles || articles.length === 0) {
    return null
  }

  const featuredArticles = articles.slice(0, 4)

  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Content</h2>
          <p className="text-muted-foreground text-lg">Discover our most popular articles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArticles.map((article) => (
            <Link key={article.id} href={`${article.slug}`}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={article.featuredImage || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className={`${getTypeColor(article.type)} text-white`}>
                      {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
                    </Badge>
                  </div>
                  {article.category && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {article.category.name}
                      </Badge>
                    </div>
                  )}
                  {article.viewCount && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded">
                      <Eye className="h-3 w-3" />
                      <span className="text-sm font-medium">{formatViewCount(article.viewCount)}</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground group-hover:text-brand-primary transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{getReadingTime(article.content)}</span>
                    </div>
                  </div>
                  {article.excerpt && (
                    <HtmlContentViewer 
                      content={article.excerpt}
                      className="text-sm text-muted-foreground line-clamp-3"
                    />
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
