"use client"

import { useState } from "react"
import { Search, Film, Tv, User, Gamepad2, BookOpen, Music, Trophy, Calendar, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { SearchDropdown } from "./search-dropdown"

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  color?: string
  isActive: boolean
  sortOrder: number
}

interface DatabaseHeroProps {
  categories?: Category[]
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

export function DatabaseHero({ categories = [] }: DatabaseHeroProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Create dynamic filters from categories
  const filters = [
    { id: "all", label: "All", icon: Search },
    ...categories.map(category => ({
      id: category.slug,
      label: category.name,
      icon: getIconForCategory(category.name)
    }))
  ]

  // Find the selected category object
  const selectedCategory = activeFilter !== "all" 
    ? categories.find(cat => cat.slug === activeFilter)
    : null


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setIsSearchOpen(value.trim().length > 0)
  }

  const handleInputFocus = () => {
    if (searchQuery.trim().length > 0) {
      setIsSearchOpen(true)
    }
  }

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    // If search is open and there's a query, trigger search with new filter
    if (isSearchOpen && searchQuery.trim()) {
      // This will cause the search dropdown to re-render with new filter
    }
  }

  return (
    <section className="bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-hover text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Search className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">SR Database</h1>
          </div>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Discover movies, TV shows, actors, and entertainment content with our comprehensive database
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            {/* Search Filters - Dynamic based on categories */}
            {filters.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.map((filter) => {
                  const Icon = filter.icon
                  return (
                    <Button
                      key={filter.id}
                      variant={activeFilter === filter.id ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => handleFilterChange(filter.id)}
                      className={`text-white hover:bg-white/20 ${
                        activeFilter === filter.id ? "bg-white text-brand-primary hover:bg-white/90" : ""
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {filter.label}
                    </Button>
                  )
                })}
              </div>
            )}

            {/* Search Input with Dropdown */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={`Search ${activeFilter === 'all' ? 'all content' : selectedCategory?.name || 'content'}...`}
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="pl-12 pr-4 py-4 text-lg bg-white border-0 focus:ring-2 focus:ring-white/50"
              />
              

              {/* Search Dropdown - Pass active filter */}
              <SearchDropdown 
                query={searchQuery}
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                categoryFilter={selectedCategory}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
