import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function MovieFeaturesFeaturedSection() {
  const featuredFeature = {
    title: "The Evolution of Superhero Cinema: How Marvel Changed Hollywood Forever",
    category: "Analysis",
    author: "Michael Kennedy",
    time: "1 day ago",
    excerpt: "An in-depth look at how the Marvel Cinematic Universe transformed the film industry and set the blueprint for modern blockbuster filmmaking.",
    image: "/placeholder.svg?height=462&width=840",
    href: "/superhero-cinema-evolution",
  }

  const secondaryFeatures = [
    {
      title: "Why Horror Movies Are Having a Renaissance: The New Golden Age Explained",
      category: "Horror Analysis",
      author: "Rachel Labonte",
      time: "2 days ago",
      excerpt: "From elevated horror to franchise revivals, examining the current boom in horror cinema.",
      image: "/placeholder.svg?height=164&width=300",
      href: "/horror-renaissance-analysis",
    },
    {
      title: "The Art of Movie Sequels: What Makes Some Work While Others Fail",
      category: "Film Theory",
      author: "Alex Leadbeater",
      time: "3 days ago",
      excerpt: "Breaking down the essential elements that separate great sequels from disappointing follow-ups.",
      image: "/placeholder.svg?height=164&width=300",
      href: "/sequel-analysis-guide",
    },
    {
      title: "Christopher Nolan's Time Obsession: Analyzing the Director's Temporal Themes",
      category: "Director Study",
      author: "Sandy Schaefer",
      time: "4 days ago",
      excerpt: "How time manipulation has become Nolan's signature storytelling device across his filmography.",
      image: "/placeholder.svg?height=164&width=300",
      href: "/nolan-time-analysis",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Movie Features</h1>
        <p className="text-gray-600">In-depth analysis, insights, and commentary on cinema</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Feature */}
        <div className="lg:col-span-2">
          <Link href={featuredFeature.href} className="group block">
            <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
              <Image
                src={featuredFeature.image || "/placeholder.svg"}
                alt={featuredFeature.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <Badge variant="secondary" className="mb-2">
              {featuredFeature.category}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors mb-3">
              {featuredFeature.title}
            </h2>
            <p className="text-gray-600 mb-3 line-clamp-2">{featuredFeature.excerpt}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>By {featuredFeature.author}</span>
              <span>•</span>
              <span>{featuredFeature.time}</span>
            </div>
          </Link>
        </div>

        {/* Secondary Features */}
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Analysis</h3>
          </div>

          {secondaryFeatures.map((feature, index) => (
            <article key={index} className="group">
              <Link href={feature.href} className="block">
                <div className="relative aspect-video mb-3 overflow-hidden rounded">
                  <Image src={feature.image || "/placeholder.svg"} alt={feature.title} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <Badge variant="outline" className="mb-1 text-xs">
                  {feature.category}
                </Badge>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{feature.excerpt}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>By {feature.author}</span>
                  <span>•</span>
                  <span>{feature.time}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
} 