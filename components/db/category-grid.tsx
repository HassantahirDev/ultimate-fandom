import Image from "next/image"
import Link from "next/link"
import { Film, Tv, User, Gamepad2, BookOpen, Music, Trophy, Calendar, Grid3X3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  color?: string
  isActive: boolean
  sortOrder: number
  articles?: any[]
}

interface CategoryGridProps {
  categories: Category[]
}

const getIconForCategory = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes('movie') || name.includes('film')) return Film
  if (name.includes('tv') || name.includes('show') || name.includes('series')) return Tv
  if (name.includes('people') || name.includes('actor') || name.includes('celebrity')) return User
  if (name.includes('game') || name.includes('gaming')) return Gamepad2
  if (name.includes('comic') || name.includes('book')) return BookOpen
  if (name.includes('music') || name.includes('soundtrack')) return Music
  if (name.includes('award') || name.includes('oscar') || name.includes('emmy')) return Trophy
  if (name.includes('event') || name.includes('premiere') || name.includes('convention')) return Calendar
  return Grid3X3
}

const getColorForCategory = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes('movie') || name.includes('film')) return "bg-blue-500"
  if (name.includes('tv') || name.includes('show') || name.includes('series')) return "bg-purple-500"
  if (name.includes('people') || name.includes('actor') || name.includes('celebrity')) return "bg-green-500"
  if (name.includes('game') || name.includes('gaming')) return "bg-orange-500"
  if (name.includes('comic') || name.includes('book')) return "bg-red-500"
  if (name.includes('music') || name.includes('soundtrack')) return "bg-pink-500"
  if (name.includes('award') || name.includes('oscar') || name.includes('emmy')) return "bg-yellow-500"
  if (name.includes('event') || name.includes('premiere') || name.includes('convention')) return "bg-indigo-500"
  return "bg-gray-500"
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Browse Categories</h2>
        <p className="text-muted-foreground text-lg">Explore our comprehensive entertainment database</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = getIconForCategory(category.name)
          const colorClass = category.color || getColorForCategory(category.name)
          const articleCount = category.articles?.length || 0
          
          return (
            <Link key={category.id} href={`${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-brand-muted overflow-hidden">
                {/* Category Image */}
                {category.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div
                          className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">{category.name}</h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Fallback to icon-based design if no image */
                  <div className="h-48 flex items-center justify-center bg-muted/50">
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-brand-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                )}

                <CardContent className="p-4">
                  {category.description && (
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  {articleCount > 0 && (
                    <div className="text-xs font-medium text-brand-primary bg-brand-muted px-3 py-1 rounded-full inline-block">
                      {articleCount} articles
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
