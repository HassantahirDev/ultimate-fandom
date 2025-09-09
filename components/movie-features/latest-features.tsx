import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function LatestFeatures() {
  const features = [
    {
      title: "The Rise and Fall of Movie Franchises: Lessons from Recent Hollywood Failures",
      category: "Industry Analysis",
      author: "Alex Leadbeater",
      time: "1 hour ago",
      excerpt:
        "Examining why some beloved franchises have stumbled in recent years and what studios can learn from these missteps.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/franchise-failures-analysis",
    },
    {
      title: "Breaking Down the Visual Effects Revolution: How CGI Changed Storytelling",
      category: "Technical Analysis",
      author: "Molly Freeman",
      time: "3 hours ago",
      excerpt:
        "From practical effects to digital worlds, exploring how VFX technology has transformed the way filmmakers tell stories.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/vfx-revolution-storytelling",
    },
    {
      title: "The Psychology Behind Movie Soundtracks: How Music Manipulates Emotion",
      category: "Film Theory",
      author: "Rachel Labonte",
      time: "5 hours ago",
      excerpt:
        "Analyzing the psychological techniques composers use to enhance narrative and emotional impact in cinema.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/movie-soundtrack-psychology",
    },
    {
      title: "Diversity in Hollywood: Measuring Progress Behind and In Front of the Camera",
      category: "Industry Report",
      author: "Mae Abdulbaki",
      time: "8 hours ago",
      excerpt:
        "A comprehensive look at representation in modern cinema and the ongoing efforts to create more inclusive storytelling.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/hollywood-diversity-report",
    },
    {
      title: "The Science of Movie Marketing: Why Some Films Succeed While Others Flop",
      category: "Marketing Analysis",
      author: "Cooper Hood",
      time: "12 hours ago",
      excerpt:
        "Deconstructing the complex world of film marketing and the strategies that can make or break a movie's success.",
      image: "/placeholder.svg?height=240&width=360",
      href: "/movie-marketing-science",
    },
  ]

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Latest Features</h2>
        <div className="flex space-x-4 text-sm">
          <button className="font-medium text-brand-primary border-b-2 border-brand-primary pb-1">All</button>
          <button className="text-gray-600 hover:text-brand-primary">Analysis</button>
          <button className="text-gray-600 hover:text-brand-primary">Opinion</button>
          <button className="text-gray-600 hover:text-brand-primary">Industry</button>
          <button className="text-gray-600 hover:text-brand-primary">Theory</button>
          <button className="text-gray-600 hover:text-brand-primary">Technical</button>
        </div>
      </div>

      <div className="space-y-8">
        {features.map((feature, index) => (
          <article key={index} className="group flex space-x-4">
            <Link href={feature.href} className="flex-shrink-0">
              <div className="relative w-32 h-20 overflow-hidden rounded-lg">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={feature.href}>
                <Badge variant="outline" className="mb-2">
                  {feature.category}
                </Badge>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{feature.excerpt}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>By {feature.author}</span>
                  <span>•</span>
                  <span>{feature.time}</span>
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          Load More Features
        </Button>
      </div>
    </section>
  )
} 