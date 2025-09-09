import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function FeaturedAnalysis() {
  const analysisArticles = [
    {
      title: "Dune: Part Two's Box Office Success Proves Audiences Crave Original Sci-Fi",
      category: "Box Office Analysis",
      author: "Kofi Outlaw",
      time: "1 day ago",
      image: "/placeholder.svg?height=200&width=320",
      href: "/dune-part-two-box-office-analysis",
    },
    {
      title: "The Hidden Symbolism in Oppenheimer: Nolan's Visual Metaphors Explained",
      category: "Film Analysis",
      author: "Michael Kennedy",
      time: "2 days ago",
      image: "/placeholder.svg?height=200&width=320",
      href: "/oppenheimer-symbolism-analysis",
    },
    {
      title: "Why Barbie's Success Changed Hollywood's Perception of Female-Led Films",
      category: "Industry Impact",
      author: "Rachel Labonte",
      time: "3 days ago",
      image: "/placeholder.svg?height=200&width=320",
      href: "/barbie-female-led-films-impact",
    },
    {
      title: "The Psychology of Movie Villains: What Makes Them Compelling",
      category: "Character Study",
      author: "Sandy Schaefer",
      time: "4 days ago",
      image: "/placeholder.svg?height=200&width=320",
      href: "/movie-villains-psychology-study",
    },
  ]

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Analysis</h2>
        <Link href="/movie-features/analysis" className="text-brand-primary hover:text-brand-hover font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analysisArticles.map((article, index) => (
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