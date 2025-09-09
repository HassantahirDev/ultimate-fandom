"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Clock, X, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ApiService } from "@/lib/api"

interface Article {
  id: string
  title: string
  slug: string
  type: 'news' | 'review' | 'feature' | 'interview' | 'opinion' | 'list'
  featuredImage?: string
  publishedAt?: string
  category?: {
    id: string
    name: string
    slug: string
  }
  author?: {
    name: string
  }
}

interface Tag {
  id: string
  name: string
  slug: string
}

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

interface SearchDropdownProps {
  query: string
  isOpen: boolean
  onClose: () => void
  categoryFilter?: Category | null
}

const formatDate = (dateString: string) => {
  return new Date(dateString).getFullYear().toString()
}

const getTypeColor = (type: string) => {
  const colors = {
    news: 'bg-blue-500',
    review: 'bg-purple-500',
    feature: 'bg-green-500',
    interview: 'bg-orange-500',
    opinion: 'bg-red-500',
    list: 'bg-yellow-500'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
}

export function SearchDropdown({ query, isOpen, onClose, categoryFilter }: SearchDropdownProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim() || !isOpen) {
      setArticles([])
      setTags([])
      setError(null)
      return
    }

    const searchContent = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Build search parameters
        const searchParams: any = {
          search: query,
          limit: 5,
          status: 'published'
        }

        // Add category filter if selected
        if (categoryFilter) {
          searchParams.categoryId = categoryFilter.id
        }

        // Use Promise.allSettled to handle individual failures
        const [articlesResult, tagsResult] = await Promise.allSettled([
          ApiService.getArticles(searchParams),
          ApiService.searchTags(query)
        ])
        
        const articles = articlesResult.status === 'fulfilled' ? articlesResult.value : []
        const tags = tagsResult.status === 'fulfilled' ? tagsResult.value.slice(0, 3) : []
        
        setArticles(articles)
        setTags(tags)
      } catch (error) {
        console.error('Search error:', error)
        setError('Search failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimeout = setTimeout(searchContent, 300)
    return () => clearTimeout(debounceTimeout)
  }, [query, isOpen, categoryFilter])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !query.trim()) {
    return null
  }

  return (
    <Card 
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white border shadow-lg z-50 max-h-96 overflow-y-auto"
    >
      <CardContent className="p-0">
        {/* Show active filter if any */}
        {categoryFilter && (
          <div className="px-4 py-2 bg-brand-muted/20 border-b flex items-center gap-2 text-sm">
            <Filter className="h-3 w-3 text-brand-primary" />
            <span className="text-muted-foreground">Searching in:</span>
            <Badge variant="secondary" className="text-brand-primary">
              {categoryFilter.name}
            </Badge>
          </div>
        )}

        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground">
            <Search className="h-4 w-4 animate-spin mx-auto mb-2" />
            Searching{categoryFilter ? ` in ${categoryFilter.name}` : ''}...
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">
            {error}
          </div>
        ) : (
          <>
            {articles.length === 0 && tags.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No results found for "{query}"
                {categoryFilter && (
                  <span className="block text-xs mt-1">in {categoryFilter.name}</span>
                )}
              </div>
            ) : (
              <>
                {/* Articles Results */}
                {articles.length > 0 && (
                  <div className="border-b">
                    <div className="px-4 py-2 text-sm font-medium text-muted-foreground border-b bg-muted/50">
                      Articles
                      {categoryFilter && (
                        <span className="ml-2 text-xs">in {categoryFilter.name}</span>
                      )}
                    </div>
                    {articles.map((article) => (
                      <Link key={article.id} href={`${article.slug}`} onClick={onClose}>
                        <div className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors">
                          <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                            {article.featuredImage ? (
                              <Image
                                src={article.featuredImage}
                                alt={article.title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Search className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground line-clamp-1">
                              {article.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {article.publishedAt && (
                                <span>{formatDate(article.publishedAt)}</span>
                              )}
                              <Badge 
                                variant="secondary" 
                                className={`${getTypeColor(article.type)} text-white text-xs`}
                              >
                                {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
                              </Badge>
                              {article.category && !categoryFilter && (
                                <Badge variant="outline" className="text-xs">
                                  {article.category.name}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Tags Results - Only show if no category filter */}
                {tags.length > 0 && !categoryFilter && (
                  <div>
                    <div className="px-4 py-2 text-sm font-medium text-muted-foreground border-b bg-muted/50">
                      Tags
                    </div>
                    {tags.map((tag) => (
                      <Link key={tag.id} href={`/tag/${tag.slug}`} onClick={onClose}>
                        <div className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors">
                          <div className="w-6 h-6 bg-muted rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-muted-foreground">#</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">
                              #{tag.name}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
} 