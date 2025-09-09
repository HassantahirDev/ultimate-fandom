import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function LatestMovieArticles() {
  const articles = [
    {
      title: "Mufasa: The Lion King - Box Office Performance Shows Disney's Live-Action Strategy May Need Changes",
      category: "Mufasa",
      author: "Michael Kennedy",
      time: "15 minutes ago",
      excerpt:
        "Despite strong visuals and performances, Mufasa's box office numbers suggest audiences may be experiencing live-action Disney fatigue.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/mufasa-box-office-analysis",
    },
    {
      title: "Sonic the Hedgehog 3: Jim Carrey's Dr. Robotnik Gets Perfect Sendoff in Emotional Final Scene",
      category: "Sonic the Hedgehog",
      author: "Alex Leadbeater",
      time: "32 minutes ago",
      excerpt:
        "Jim Carrey delivers a surprisingly emotional performance in what might be his final appearance as the iconic villain Dr. Robotnik.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/sonic-3-carrey-robotnik",
    },
    {
      title: "Wicked Part Two: Everything We Know About the Highly Anticipated Musical Sequel",
      category: "Wicked",
      author: "Rachel Labonte",
      time: "45 minutes ago",
      excerpt:
        "Following Part One's massive success, here's everything we know about the conclusion of the Wicked movie adaptation.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/wicked-part-two-news",
    },
    {
      title: "Captain America: Brave New World - Anthony Mackie Promises a More Grounded MCU Story",
      category: "Captain America",
      author: "Molly Freeman",
      time: "1 hour ago",
      excerpt:
        "Anthony Mackie discusses how his Captain America movie will focus on political thriller elements rather than cosmic threats.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/captain-america-brave-new-world",
    },
    {
      title: "Gladiator 2: Paul Mescal and Ridley Scott's Epic Sequel Lives Up to Russell Crowe's Legacy",
      category: "Gladiator",
      author: "Sandy Schaefer",
      time: "2 hours ago",
      excerpt:
        "Nearly 25 years later, Ridley Scott returns to the arena with a worthy successor that honors the original while carving its own path.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/gladiator-2-review",
    },
  ]

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Latest Movie Articles</h2>
        <div className="flex space-x-4 text-sm">
          <button className="font-medium text-brand-primary border-b-2 border-brand-primary pb-1">All</button>
          <button className="text-gray-600 hover:text-brand-primary">Superhero</button>
          <button className="text-gray-600 hover:text-brand-primary">Action</button>
          <button className="text-gray-600 hover:text-brand-primary">Horror</button>
          <button className="text-gray-600 hover:text-brand-primary">Comedy</button>
          <button className="text-gray-600 hover:text-brand-primary">Drama</button>
        </div>
      </div>

      <div className="space-y-8">
        {articles.map((article, index) => (
          <article key={index} className="group flex space-x-4">
            <Link href={article.href} className="flex-shrink-0">
              <div className="relative w-32 h-20 overflow-hidden rounded-lg">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={article.href}>
                <Badge variant="outline" className="mb-2">
                  {article.category}
                </Badge>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>By {article.author}</span>
                  <span>•</span>
                  <span>{article.time}</span>
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>
    </section>
  )
} 