import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function LatestThreadsSection() {
  const latestThreads = [
    {
      title: "Should Ryan Gosling be the MCU's Ghost Rider?",
      author: "Felipe",
      date: "21 minutes ago",
      href: "/threads/ryan-gosling-ghost-rider",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "What is Spider-Man's most comic book-accurate movie suit?",
      author: "Felipe",
      date: "30 minutes ago",
      href: "/threads/spider-man-comic-accurate-suit",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Is Marvel and DC's announced Deadpool & Batman crossover exciting?",
      author: "Felipe",
      date: "37 minutes ago",
      href: "/threads/deadpool-batman-crossover",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Will the new Superman movie live up to the hype?",
      author: "Tessa",
      date: "1 hour ago",
      href: "/threads/superman-movie-hype",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Best Marvel Phase 5 movie so far?",
      author: "Grant",
      date: "2 hours ago",
      href: "/threads/best-marvel-phase-5",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Latest</h2>
        <Link href="/threads/latest" className="text-brand-primary hover:text-brand-hover font-medium">
          More
        </Link>
      </div>

      <div className="space-y-6">
        {latestThreads.map((thread, index) => (
          <Card key={index} className="group hover:shadow-lg transition-shadow">
            <Link href={thread.href}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={thread.image || "/placeholder.svg"}
                      alt={thread.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
                      {thread.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>By {thread.author}</span>
                      <span>•</span>
                      <span>{thread.date}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          See More Threads
        </Button>
      </div>
    </section>
  )
}
