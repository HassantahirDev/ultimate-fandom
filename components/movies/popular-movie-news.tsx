import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function PopularMovieNews() {
  const popularNews = [
    {
      title: "Spider-Man 4: Tom Holland Confirms Marvel Movie Is Happening",
      category: "Spider-Man",
      author: "Russ Milheim",
      time: "1 hour ago",
      image: "/placeholder.svg?height=200&width=320",
      href: "/spider-man-4-confirmed",
    },
    {
      title: "The Batman Part II: Everything We Know About Robert Pattinson's Dark Knight Sequel",
      category: "The Batman",
      author: "Kofi Outlaw",
      time: "3 hours ago",
      image: "/placeholder.svg?height=200&width=320",
      href: "/batman-part-2-news",
    },
    {
      title: "Avengers: Secret Wars Cast - Every Marvel Character Rumored To Appear",
      category: "Avengers",
      author: "Richard Nebens",
      time: "5 hours ago",
      image: "/placeholder.svg?height=200&width=320",
      href: "/avengers-secret-wars-cast",
    },
    {
      title: "Indiana Jones 6: Harrison Ford's Return Chances After Dial of Destiny",
      category: "Indiana Jones",
      author: "Matthew Biggin",
      time: "7 hours ago",
      image: "/placeholder.svg?height=200&width=320",
      href: "/indiana-jones-6-harrison-ford",
    },
  ]

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Popular Movie News</h2>
        <Link href="/movies/news" className="text-brand-primary hover:text-brand-hover font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularNews.map((article, index) => (
          <article key={index} className="group">
            <Link href={article.href}>
              <div className="relative aspect-video mb-3 overflow-hidden rounded-lg">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <Badge variant="outline" className="mb-2">
                {article.category}
              </Badge>
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-3 mb-2">
                {article.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>By {article.author}</span>
                <span>•</span>
                <span>{article.time}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
} 