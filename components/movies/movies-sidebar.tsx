import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MoviesSidebar() {
  const trendingReviews = [
    {
      title: "Nosferatu Review: Robert Eggers Delivers Gothic Horror Masterpiece",
      rating: "9/10",
      image: "/placeholder.svg?height=80&width=120",
      href: "/nosferatu-review",
    },
    {
      title: "A Complete Unknown Review: Timothée Chalamet Channels Bob Dylan",
      rating: "8/10",
      image: "/placeholder.svg?height=80&width=120",
      href: "/complete-unknown-review",
    },
    {
      title: "Mufasa Review: Disney's Prequel Falls Short of Lion King Legacy",
      rating: "6/10",
      image: "/placeholder.svg?height=80&width=120",
      href: "/mufasa-review",
    },
  ]

  const upcomingReleases = [
    {
      title: "Thunderbolts",
      date: "May 2, 2025",
      genre: "Superhero",
      image: "/placeholder.svg?height=60&width=90",
    },
    {
      title: "Fantastic Four: First Steps",
      date: "July 25, 2025",
      genre: "Superhero",
      image: "/placeholder.svg?height=60&width=90",
    },
    {
      title: "Superman: Legacy",
      date: "July 11, 2025",
      genre: "Superhero",
      image: "/placeholder.svg?height=60&width=90",
    },
    {
      title: "The Batman Part II",
      date: "October 3, 2025",
      genre: "Superhero",
      image: "/placeholder.svg?height=60&width=90",
    },
  ]

  const boxOfficeTop = [
    { title: "Wicked", weekend: "$114.2M", total: "$359.2M" },
    { title: "Gladiator II", weekend: "$30.7M", total: "$111.2M" },
    { title: "Red One", weekend: "$12.3M", total: "$75.1M" },
    { title: "The Best Christmas Pageant Ever", weekend: "$3.3M", total: "$35.2M" },
  ]

  return (
    <div className="space-y-8">
      {/* Trending Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Trending Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingReviews.map((review, index) => (
              <div key={index} className="flex space-x-3">
                <Link href={review.href} className="flex-shrink-0">
                  <div className="relative w-16 h-12 overflow-hidden rounded">
                    <Image src={review.image} alt={review.title} fill className="object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={review.href}>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-brand-primary transition-colors">
                      {review.title}
                    </h4>
                    <div className="flex items-center mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {review.rating}
                      </Badge>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Releases */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Upcoming Releases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingReleases.map((movie, index) => (
              <div key={index} className="flex space-x-3">
                <div className="relative w-12 h-8 flex-shrink-0 overflow-hidden rounded">
                  <Image src={movie.image} alt={movie.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{movie.title}</h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{movie.date}</span>
                    <span>•</span>
                    <span>{movie.genre}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Box Office */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Box Office Top 5</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {boxOfficeTop.map((movie, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-brand-primary">#{index + 1}</span>
                    <h4 className="text-sm font-medium text-gray-900">{movie.title}</h4>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <div>Weekend: {movie.weekend}</div>
                    <div>Total: {movie.total}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Movie Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Get the latest movie news, reviews, and trailers delivered to your inbox.
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-md hover:bg-brand-hover transition-colors">
              Subscribe
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 