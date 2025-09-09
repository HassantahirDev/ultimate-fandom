import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function FeaturedSection() {
  const featuredArticle = {
    title:
      "I Hope James Gunn's Superman Being \"Weak\" Doesn't Lead To DC Repeating A Divisive Clark Kent Story For The Third Time In 9 Years",
    excerpt:
      "The Superman movie trailers have led to debates about the DCU hero being weak, and that could lead to a dark Clark Kent story trend being repeated.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Superman",
    href: "/james-gunn-superman-death-dcu-op-ed/",
  }

  const secondaryArticles = [
    {
      title: "The Simpsons Season 36's Flashforward Alters 1 Important Aspect Of Lisa's Future (& That's Great)",
      image: "/placeholder.svg?height=300&width=400",
      category: "The Simpsons",
      href: "/the-simpsons-lisa-future-season-36-relationship-explainer/",
    },
    {
      title: "Why 1994's Jurassic Park Movie Didn't Have Any Aquatic Species, Explained By Science",
      image: "/placeholder.svg?height=300&width=400",
      category: "Jurassic Park",
      href: "/jurassic-park-no-aquatic-dinosaurs-reason-explained/",
    },
    {
      title:
        "I Believe Five Nights At Freddy's 2 Will Be A Huge Improvement On The First Movie After Hearing About Its Development",
      image: "/placeholder.svg?height=300&width=400",
      category: "Five Nights at Freddy's 2",
      href: "/five-nights-at-freddys-2-improvement-listen-to-fans/",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden group cursor-pointer">
            <Link href={featuredArticle.href}>
              <div className="relative aspect-video">
                <Image
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-brand-primary text-white hover:bg-brand-hover">
                    {featuredArticle.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground group-hover:text-brand-primary transition-colors mb-3 line-clamp-3">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3">{featuredArticle.excerpt}</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Secondary Articles */}
        <div className="space-y-6">
          {secondaryArticles.map((article, index) => (
            <Card key={index} className="overflow-hidden group cursor-pointer">
              <Link href={article.href}>
                <div className="relative aspect-video">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-brand-primary text-white hover:bg-brand-hover text-xs">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-brand-primary transition-colors line-clamp-3 text-sm">
                    {article.title}
                  </h3>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
