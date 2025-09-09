import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface PopularItem {
  title: string
  category: string
  author: string
  time: string
  image: string
  href: string
}

interface CategoryPopularContentProps {
  title: string
  items: PopularItem[]
  viewAllHref?: string
}

export function CategoryPopularContent({ 
  title, 
  items, 
  viewAllHref 
}: CategoryPopularContentProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-brand-primary hover:text-brand-hover font-medium">
            View All →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <article key={index} className="group">
            <Link href={item.href}>
              <div className="relative aspect-video mb-3 overflow-hidden rounded-lg">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <Badge variant="outline" className="mb-2">
                {item.category}
              </Badge>
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-3 mb-2">
                {item.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>By {item.author}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
} 