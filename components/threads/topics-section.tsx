import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageSquare, Hash } from "lucide-react"

export function TopicsSection() {
  const topics = [
    {
      title: "Movies",
      description: "Join the discussion on the biggest topics in movies with our Threads.",
      threads: "3.2K",
      users: "2.4K",
      posts: "4.4K",
      image: "/placeholder.svg?height=200&width=300",
      href: "/threads/movies",
    },
    {
      title: "TV Shows",
      description: "Join the discussion on the biggest topics in TV with our Threads.",
      threads: "2.6K",
      users: "3.2K",
      posts: "4.2K",
      image: "/placeholder.svg?height=200&width=300",
      href: "/threads/tv-shows",
    },
    {
      title: "Superheroes",
      description:
        "Join the discussion on the biggest topics about your favorite Superhero franchises with our Threads.",
      threads: "1.3K",
      users: "1.1K",
      posts: "2.2K",
      image: "/placeholder.svg?height=200&width=300",
      href: "/threads/superheroes",
    },
    {
      title: "Gaming",
      description: "Join the discussion on the biggest topics in gaming with our Threads.",
      threads: "472",
      users: "376",
      posts: "461",
      image: "/placeholder.svg?height=200&width=300",
      href: "/threads/gaming",
    },
    {
      title: "Comics",
      description: "Join the discussion on the biggest topics in comics with our Threads.",
      threads: "82",
      users: "45",
      posts: "60",
      image: "/placeholder.svg?height=200&width=300",
      href: "/threads/comics",
    },
    {
      title: "Star Wars",
      description: "Have your say on the latest Star Wars topics in our Threads community.",
      threads: "268",
      users: "231",
      posts: "347",
      image: "/placeholder.svg?height=200&width=300",
      href: "/threads/star-wars",
    },
    {
      title: "Anime",
      description: "Join the discussion on the biggest topics in anime with our Threads.",
      threads: "33",
      users: "84",
      posts: "118",
      image: "/placeholder.svg?height=200&width=300",
      href: "/threads/anime",
    },
    {
      title: "Reality TV",
      description: "Join the discussion on the biggest topics in reality TV with our Threads.",
      threads: "478",
      users: "401",
      posts: "494",
      image: "/placeholder.svg?height=200&width=300",
      href: "/threads/reality-tv",
    },
  ]

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Topics</h2>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">6.9K</div>
          <div className="text-sm text-muted-foreground">Total Threads</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">6.3K</div>
          <div className="text-sm text-muted-foreground">Total Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">9.8K</div>
          <div className="text-sm text-muted-foreground">Total Posts</div>
        </div>
        <div className="text-center">
          <Button className="bg-brand-primary hover:bg-brand-hover">Submit a Thread</Button>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <Card key={index} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image src={topic.image || "/placeholder.svg"} alt={topic.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-brand-primary transition-colors mb-2">
                    <Link href={topic.href}>{topic.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{topic.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Hash className="h-3 w-3" />
                        <span>{topic.threads}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{topic.users}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{topic.posts}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-brand-primary border-brand-primary hover:bg-brand-muted">
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
