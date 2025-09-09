import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp } from "lucide-react"

export function ThreadsSidebar() {
  const leaderboards = [
    { name: "Grant", threads: 90, likes: 3, rank: 1 },
    { name: "Felipe", threads: 85, likes: 5, rank: 2 },
    { name: "Tessa", threads: 86, likes: 4, rank: 3 },
    { name: "Kevin", threads: 80, likes: 6, rank: 4 },
    { name: "Cher", threads: 83, likes: 0, rank: 5 },
  ]

  const recommendedTopics = [
    { name: "Deadpool & Wolverine", threads: 57 },
    { name: "The Boys", threads: 43 },
    { name: "House Of The Dragon", threads: 38 },
    { name: "Stranger Things", threads: 29 },
    { name: "The Witcher", threads: 25 },
  ]

  return (
    <div className="space-y-6">
      {/* Thread Leaderboards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Thread Leaderboards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Leaderboards are calculated based on Threads published and the amount of likes received on those published
            Threads.
          </p>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground mb-3">Last Month</div>
            {leaderboards.map((leader, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-brand-muted rounded-full flex items-center justify-center text-xs font-bold text-brand-primary">
                    {leader.rank}
                  </span>
                  <Link
                    href={`/user/${leader.name.toLowerCase()}`}
                    className="font-medium text-foreground hover:text-brand-primary"
                  >
                    {leader.name}
                  </Link>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{leader.threads} Threads</div>
                  <div>{leader.likes} Likes</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand-primary" />
            Recommended
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendedTopics.map((topic, index) => (
              <Link key={index} href={`/threads/topic/${topic.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
                  <span className="font-medium text-foreground group-hover:text-brand-primary transition-colors">
                    {topic.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {topic.threads}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
