import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function LatestArticles() {
  const articles = [
    {
      title:
        "Thunderbolts*' Ending Gives Daredevil The Perfect Reason To Double Down On Taking Kingpin Out In Daredevil: Born Again Season 2 Theory",
      excerpt:
        "Daredevil: Born Again could have some major implications in season 2 after the major events of Thunderbolts* in the MCU if this theory proves correct.",
      image: "/placeholder.svg?height=240&width=360",
      category: "Thunderbolts",
      author: "Ben Gibbons",
      timeAgo: "1 hour ago",
      href: "/thunderbolts-ending-daredevil-born-again-season-2-new-avengers-kingpin-theory/",
      isLarge: true,
    },
    {
      title:
        "What Street Fighter Characters Jason Momoa & His 3 New Co-Stars Could Play In The Live-Action Video Game Movie",
      excerpt:
        "The upcoming Street Fighter reboot, based on the Capcom video game of the same name, is assembling an exciting cast who are perfect for these roles.",
      image: "/placeholder.svg?height=240&width=360",
      category: "Street Fighter",
      author: "Karlis Wilde",
      timeAgo: "2 hours ago",
      href: "/street-fighter-movie-jason-momoa-koji-centineo-reigns-characters-play/",
      comments: 1,
    },
    {
      title:
        "I'm Convinced Godzilla X Kong: Supernova's Villain Is This Underrated 54-Year-Old Kaiju, Not SpaceGodzilla Or Gigan",
      excerpt:
        "It's possible that Godzilla x Kong: Supernova's villain is not SpaceGodzilla or Gigan, but an underrated kaiju introduced 54 years ago.",
      image: "/placeholder.svg?height=240&width=360",
      category: "Godzilla X Kong: Supernova",
      author: "Adam Bentz",
      timeAgo: "2 hours ago",
      href: "/godzilla-x-kong-supernova-movie-villain-hedorah-not-spacegodzilla-gigan/",
    },
    {
      title:
        "The New Predator Movie's Xenomorph Tease Looks Like It's Continuing An Alien Vs. Predator Rule In Epic Style",
      excerpt:
        "A new Predator film draws a surprising connection to the lore of the Yautja that was previously explored in installments like Alien vs. Predator.",
      image: "/placeholder.svg?height=240&width=360",
      category: "Predator: Killer of Killers",
      author: "Karlis Wilde",
      timeAgo: "2 hours ago",
      href: "/predator-killer-of-killers-movie-yautja-alien-xenomorph-blood-ritual/",
    },
    {
      title: "Law & Order: Organized Crime Season 5 Sure Seems Like It's Setting Up 1 Major Character For A Tragic End",
      excerpt:
        "Law & Order: Organized Crime season 5 has been teasing that a tragic ending might be in the future of one character close to the Stabler family.",
      image: "/placeholder.svg?height=240&width=360",
      category: "Law and Order: Organized Crime",
      author: "Nadica Terzieva",
      timeAgo: "2 hours ago",
      href: "/law-order-organized-crime-season-5-joe-jr-tragedy-setup/",
    },
    {
      title: "Russell Crowe's Underrated 1994 Movie Is Different To Anything Else You've Seen Him In",
      excerpt:
        "The Sum of Us showcases a side of Russell Crowe you've never seen before, which is often overlooked by his more prominent roles in Gladiator.",
      image: "/placeholder.svg?height=240&width=360",
      category: "The Sum of Us",
      author: "Martha Wright",
      timeAgo: "2 hours ago",
      href: "/russell-crowe-the-sum-of-us-movie-unusual-explainer/",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-bold text-foreground">Latest</h2>
      </div>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <Card key={index} className={`overflow-hidden group cursor-pointer ${article.isLarge ? "lg:flex" : ""}`}>
            <Link href={article.href} className={article.isLarge ? "flex w-full" : "block"}>
              <div className={`relative ${article.isLarge ? "w-full lg:w-1/2" : "w-full"} aspect-video`}>
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className={`p-6 ${article.isLarge ? "lg:w-1/2 flex flex-col justify-center" : ""}`}>
                <div className="mb-3">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                </div>
                <h3
                  className={`font-bold text-foreground group-hover:text-brand-primary transition-colors line-clamp-3 mb-3 ${article.isLarge ? "text-xl" : "text-lg"}`}
                >
                  {article.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{article.timeAgo}</span>
                  </div>
                  {article.comments && (
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{article.comments}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Button variant="outline" size="lg">
          See More
        </Button>
      </div>
    </div>
  )
}
