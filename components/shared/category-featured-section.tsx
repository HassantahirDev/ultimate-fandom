import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface FeaturedItem {
  title: string
  category: string
  author?: string
  time?: string
  excerpt?: string
  image: string
  href: string
}

interface CategoryFeaturedSectionProps {
  title: string
  description: string
  featuredItem: FeaturedItem
  secondaryItems: FeaturedItem[]
  sidebarTitle?: string
}

export function CategoryFeaturedSection({ 
  title, 
  description, 
  featuredItem, 
  secondaryItems,
  sidebarTitle = "Trending"
}: CategoryFeaturedSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Item */}
        <div className="lg:col-span-2">
          <Link href={featuredItem.href} className="group block">
            <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
              <Image
                src={featuredItem.image || "/placeholder.svg"}
                alt={featuredItem.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <Badge variant="secondary" className="mb-2">
              {featuredItem.category}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors mb-3">
              {featuredItem.title}
            </h2>
            {featuredItem.excerpt && (
              <p className="text-gray-600 mb-3 line-clamp-2">{featuredItem.excerpt}</p>
            )}
            {featuredItem.author && featuredItem.time && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>By {featuredItem.author}</span>
                <span>•</span>
                <span>{featuredItem.time}</span>
              </div>
            )}
          </Link>
        </div>

        {/* Secondary Items */}
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{sidebarTitle}</h3>
          </div>

          {secondaryItems.map((item, index) => (
            <article key={index} className="group">
              <Link href={item.href} className="flex space-x-4">
                <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="outline" className="mb-1 text-xs">
                    {item.category}
                  </Badge>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  {item.author && item.time && (
                    <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                      <span>By {item.author}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
} 