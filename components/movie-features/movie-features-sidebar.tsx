import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MovieFeaturesSidebar() {
  const editorsPicks = [
    {
      title: "The Decline of Original Storytelling in Modern Hollywood",
      author: "Michael Kennedy",
      time: "2 days ago",
      image: "/placeholder.svg?height=80&width=120",
      href: "/original-storytelling-decline",
    },
    {
      title: "Why Movie Theaters Are Still Essential to Cinema Experience",
      author: "Rachel Labonte",
      time: "3 days ago",
      image: "/placeholder.svg?height=80&width=120",
      href: "/movie-theaters-essential",
    },
    {
      title: "The Art of Film Adaptation: From Book to Screen Success Stories",
      author: "Sandy Schaefer",
      time: "1 week ago",
      image: "/placeholder.svg?height=80&width=120",
      href: "/film-adaptation-success",
    },
  ]

  const trendingTopics = [
    { topic: "Marvel Fatigue", posts: "1.2k discussions" },
    { topic: "Streaming vs Theaters", posts: "856 discussions" },
    { topic: "AI in Filmmaking", posts: "643 discussions" },
    { topic: "Independent Cinema", posts: "429 discussions" },
    { topic: "Franchise Reboots", posts: "312 discussions" },
  ]

  const popularAnalysts = [
    { name: "Michael Kennedy", articles: "1,247", specialty: "Industry Analysis" },
    { name: "Rachel Labonte", articles: "892", specialty: "Film Theory" },
    { name: "Alex Leadbeater", articles: "756", specialty: "Technical Analysis" },
    { name: "Sandy Schaefer", articles: "634", specialty: "Director Studies" },
  ]

  const featuredSeries = [
    {
      title: "Director Spotlight",
      description: "In-depth profiles of cinema's most influential filmmakers",
      episodes: "15 articles",
      image: "/placeholder.svg?height=60&width=90",
    },
    {
      title: "Genre Evolution",
      description: "How movie genres have transformed over the decades",
      episodes: "12 articles",
      image: "/placeholder.svg?height=60&width=90",
    },
    {
      title: "Box Office Decoded",
      description: "Understanding the business side of moviemaking",
      episodes: "8 articles",
      image: "/placeholder.svg?height=60&width=90",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Editor's Picks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Editor's Picks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {editorsPicks.map((article, index) => (
              <div key={index} className="flex space-x-3">
                <Link href={article.href} className="flex-shrink-0">
                  <div className="relative w-16 h-12 overflow-hidden rounded">
                    <Image src={article.image} alt={article.title} fill className="object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={article.href}>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-brand-primary transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <span>By {article.author}</span>
                      <span>•</span>
                      <span>{article.time}</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 hover:text-brand-primary cursor-pointer transition-colors">
                    #{topic.topic}
                  </h4>
                  <p className="text-xs text-gray-500">{topic.posts}</p>
                </div>
                <span className="text-sm font-medium text-brand-primary">#{index + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Analysts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Popular Analysts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularAnalysts.map((analyst, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 hover:text-brand-primary cursor-pointer transition-colors">
                    {analyst.name}
                  </h4>
                  <p className="text-xs text-gray-500">{analyst.specialty}</p>
                  <p className="text-xs text-gray-400">{analyst.articles} articles</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Series */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Featured Series</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuredSeries.map((series, index) => (
              <div key={index} className="flex space-x-3">
                <div className="relative w-12 h-8 flex-shrink-0 overflow-hidden rounded">
                  <Image src={series.image} alt={series.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 hover:text-brand-primary cursor-pointer transition-colors">
                    {series.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{series.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{series.episodes}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Feature Analysis Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Get weekly in-depth movie analysis and exclusive feature articles.
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