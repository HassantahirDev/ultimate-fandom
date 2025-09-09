import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function MoviesFeaturedSection() {
  const featuredMovie = {
    title: "Marvel's Fantastic Four: First Steps - Everything We Know About The MCU's Reboot",
    category: "Fantastic Four",
    image: "/placeholder.svg?height=462&width=840",
    href: "/fantastic-four-first-steps",
  }

  const secondaryMovies = [
    {
      title: "Superman: Legacy - David Corenswet's Man of Steel Costume Gets First Look in New Set Photos",
      category: "Superman",
      author: "Cooper Hood",
      time: "2 hours ago",
      image: "/placeholder.svg?height=164&width=300",
      href: "/superman-legacy-costume",
    },
    {
      title: "Avatar 3: Fire and Ash Gets Official Title & First Look Images From James Cameron",
      category: "Avatar",
      author: "Mae Abdulbaki",
      time: "4 hours ago",
      image: "/placeholder.svg?height=164&width=300",
      href: "/avatar-3-fire-ash",
    },
    {
      title: "Deadpool & Wolverine's Hugh Jackman Reveals What Convinced Him To Return as Wolverine",
      category: "Deadpool & Wolverine",
      author: "Brennan Klein",
      time: "6 hours ago",
      image: "/placeholder.svg?height=164&width=300",
      href: "/hugh-jackman-wolverine-return",
    },
    {
      title: "John Wick: Chapter 5 Production Update Revealed by Director Chad Stahelski",
      category: "John Wick",
      author: "Nicholas Brooks",
      time: "8 hours ago",
      image: "/placeholder.svg?height=164&width=300",
      href: "/john-wick-5-update",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Movies</h1>
        <p className="text-gray-600">The latest movie news, reviews, trailers, and analysis</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Movie */}
        <div className="lg:col-span-2">
          <Link href={featuredMovie.href} className="group block">
            <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
              <Image
                src={featuredMovie.image || "/placeholder.svg"}
                alt={featuredMovie.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <Badge variant="secondary" className="mb-2">
              {featuredMovie.category}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
              {featuredMovie.title}
            </h2>
          </Link>
        </div>

        {/* Secondary Movies */}
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Trending Movie News</h3>
          </div>

          {secondaryMovies.map((movie, index) => (
            <article key={index} className="group">
              <Link href={movie.href} className="flex space-x-4">
                <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded">
                  <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="outline" className="mb-1 text-xs">
                    {movie.category}
                  </Badge>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {movie.title}
                  </h4>
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                    <span>By {movie.author}</span>
                    <span>•</span>
                    <span>{movie.time}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
} 