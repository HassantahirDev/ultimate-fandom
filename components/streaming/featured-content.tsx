import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function FeaturedContent() {
  const featuredShows = [
    {
      title: "The Last of Us",
      platform: "HBO Max",
      rating: 9.2,
      genre: "Drama",
      image: "/placeholder.svg?height=300&width=200",
      href: "/streaming/the-last-of-us",
    },
    {
      title: "Wednesday",
      platform: "Netflix",
      rating: 8.1,
      genre: "Comedy",
      image: "/placeholder.svg?height=300&width=200",
      href: "/streaming/wednesday",
    },
    {
      title: "The Mandalorian",
      platform: "Disney+",
      rating: 8.7,
      genre: "Sci-Fi",
      image: "/placeholder.svg?height=300&width=200",
      href: "/streaming/mandalorian",
    },
    {
      title: "The Boys",
      platform: "Amazon Prime",
      rating: 8.9,
      genre: "Action",
      image: "/placeholder.svg?height=300&width=200",
      href: "/streaming/the-boys",
    },
  ]

  const featuredMovies = [
    {
      title: "Dune: Part Two",
      platform: "HBO Max",
      rating: 8.8,
      genre: "Sci-Fi",
      image: "/placeholder.svg?height=300&width=200",
      href: "/streaming/dune-part-two",
    },
    {
      title: "Spider-Man: Across the Spider-Verse",
      platform: "Netflix",
      rating: 9.0,
      genre: "Animation",
      image: "/placeholder.svg?height=300&width=200",
      href: "/streaming/spider-verse",
    },
    {
      title: "Guardians of the Galaxy Vol. 3",
      platform: "Disney+",
      rating: 8.2,
      genre: "Action",
      image: "/placeholder.svg?height=300&width=200",
      href: "/streaming/guardians-3",
    },
    {
      title: "Air",
      platform: "Amazon Prime",
      rating: 7.8,
      genre: "Drama",
      image: "/placeholder.svg?height=300&width=200",
      href: "/streaming/air",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Featured TV Shows */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Featured TV Shows</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredShows.map((show, index) => (
            <Link key={index} href={show.href}>
              <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={show.image || "/placeholder.svg"}
                    alt={show.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                      {show.platform}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{show.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-brand-primary transition-colors line-clamp-1 mb-1">
                    {show.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{show.genre}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Movies */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Featured Movies</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredMovies.map((movie, index) => (
            <Link key={index} href={movie.href}>
              <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                      {movie.platform}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-brand-primary transition-colors line-clamp-1 mb-1">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{movie.genre}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
