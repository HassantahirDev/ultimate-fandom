import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Article, Tag } from "@/lib/api"

interface SidebarProps {
  trendingArticles?: Article[]
  popularTags?: Tag[]
}

export function Sidebar({ trendingArticles = [], popularTags = [] }: SidebarProps) {
  const upcomingMovies = [
    "Thunderbolts",
    "Mission: Impossible - The Final Reckoning",
    "Karate Kid: Legends",
    "How to Train Your Dragon (Live Action)",
    "28 Years Later",
    "Jurassic World Rebirth",
    "Superman",
    "The Fantastic Four: First Steps",
  ]

  return (
    <aside className="space-y-6">
      {/* Trending Now */}
      {trendingArticles.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Trending</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trendingArticles.slice(0, 3).map((article) => (
              <Link key={article.id} href={`${article.slug}`} className="group block">
                <div className="relative aspect-video mb-2 overflow-hidden rounded">
                  <Image
                    src={article.featuredImage || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h4 className="text-sm font-medium text-foreground group-hover:text-brand-primary dark:group-hover:text-brand-primary transition-colors line-clamp-3">
                  {article.title}
                </h4>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Trending Topics */}
      {popularTags.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {popularTags.slice(0, 8).map((tag) => (
                <li key={tag.id}>
                  <Link
                    href={`/tags/${tag.slug}`}
                    className="text-sm text-muted-foreground hover:text-brand-primary dark:hover:text-brand-primary"
                  >
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Movies */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Upcoming Movies</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {upcomingMovies.map((movie, index) => (
              <li key={index}>
                <Link
                  href={`/movie/${movie.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-muted-foreground hover:text-brand-primary dark:hover:text-brand-primary"
                >
                  {movie}
                </Link>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </aside>
  )
}
