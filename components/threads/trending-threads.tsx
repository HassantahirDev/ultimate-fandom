import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageSquare, Clock } from "lucide-react"

export function TrendingThreadsSection() {
  const trendingThreads = [
    {
      title: "Are you still upset about Henry Cavill's The Witcher recast?",
      excerpt:
        "Henry Cavill played Geralt of Rivia in the first three seasons of the Netflix series, but Liam Hemsworth will take over the role in season 4.",
      author: "Tessa",
      latest: "1 hr ago",
      users: 30,
      posts: 32,
      image: "/placeholder.svg?height=300&width=400",
      href: "/threads/henry-cavill-witcher-recast",
    },
    {
      title: "I'm convinced Tom Holland's Spider-Man will be in Avengers: Doomsday",
      excerpt:
        "Now that Avengers: Doomsday has been delayed to December 2026, I think there's a strong chance we'll see Spider-Man return.",
      author: "Felipe",
      latest: "4 days ago",
      users: 1,
      posts: 1,
      image: "/placeholder.svg?height=300&width=400",
      href: "/threads/spider-man-avengers-doomsday",
    },
    {
      title: "Is Taylor Swift going to announce a new album at the AMAs?",
      excerpt:
        "As a long-time Swiftie, I would lose that title if I was not clowning about potential album announcements at major award shows.",
      author: "Tessa",
      latest: "2025-05-18",
      users: 2,
      posts: 4,
      image: "/placeholder.svg?height=300&width=400",
      href: "/threads/taylor-swift-new-album-amas",
    },
  ]

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Trending</h2>
          <Link href="/threads/trending" className="text-brand-primary hover:text-brand-hover font-medium">
            SEE ALL →
          </Link>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {trendingThreads.map((thread, index) => (
              <Card key={index} className="flex-shrink-0 w-80 group cursor-pointer hover:shadow-lg transition-shadow">
                <Link href={thread.href}>
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={thread.image || "/placeholder.svg"}
                      alt={thread.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 mb-3">
                      {thread.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{thread.excerpt}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{thread.author}</span>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{thread.latest}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{thread.users}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{thread.posts}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
