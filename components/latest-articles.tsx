"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ApiService, Article } from "@/lib/api"

interface LatestArticlesProps {
  initialLimit?: number
  categorySlug?: string
  excludeArticleId?: string
}

export function LatestArticles({ initialLimit = 6, categorySlug, excludeArticleId }: LatestArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>(categorySlug || 'all')
  const [offset, setOffset] = useState(0)
  const limit = initialLimit

  const categories = [
    { slug: 'all', name: 'All' },
    { slug: '/movies', name: 'Movies' },
    { slug: '/tv', name: 'TV' },
    { slug: '/comics', name: 'Comics' },
    { slug: '/gaming', name: 'Gaming' },
  ]

  // Utility function to strip HTML tags and extract plain text
  const stripHtmlTags = (html: string): string => {
    if (typeof window !== 'undefined') {
      // Client-side: use DOM parser
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html
      return tempDiv.textContent || tempDiv.innerText || ''
    } else {
      // Server-side: use regex (basic fallback)
      return html.replace(/<[^>]*>/g, '').trim()
    }
  }

  const fetchArticles = async (reset = false) => {
    try {
      const currentOffset = reset ? 0 : offset
      const isLoadingMore = !reset && articles.length > 0
      
      if (isLoadingMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      let fetchedArticles: Article[] = []

      if (activeCategory === 'all') {
        // Fetch all published articles
        fetchedArticles = await ApiService.getArticles({
          status: 'published',
          limit,
          offset: currentOffset,
        })
      } else {
        // Fetch articles by category slug
        fetchedArticles = await ApiService.getArticlesByCategorySlug(
          encodeURIComponent(activeCategory), // Encode the category slug with leading slash
          limit
        )
        
        // For category-specific requests, we need to handle pagination manually
        if (!reset) {
          // Skip already loaded articles
          fetchedArticles = fetchedArticles.slice(currentOffset)
        }
      }
      
      // Filter out the excluded article if provided
      if (excludeArticleId) {
        fetchedArticles = fetchedArticles.filter(article => article.id !== excludeArticleId)
      }

      if (reset) {
        setArticles(fetchedArticles)
        setOffset(fetchedArticles.length)
      } else {
        setArticles(prev => [...prev, ...fetchedArticles])
        setOffset(prev => prev + fetchedArticles.length)
      }
      
      // Check if there are more articles to load
      setHasMore(fetchedArticles.length === limit)
      
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchArticles(true)
  }, [activeCategory])

  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug)
    setOffset(0)
  }

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchArticles(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} ${days === 1 ? 'day' : 'days'} ago`
    }
  }

  // Check if we should show horizontal layout for first 3 articles
  const shouldShowHorizontalLayout = categorySlug && activeCategory === categorySlug
  const horizontalArticles = shouldShowHorizontalLayout ? articles.slice(0, 3) : []
  const remainingArticles = shouldShowHorizontalLayout ? articles.slice(3) : articles

  if (loading && articles.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest</h2>
        </div>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse flex space-x-4">
              <div className="flex-shrink-0 w-32 h-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section>
      {/* Horizontal layout for first 3 articles when category matches */}
      {shouldShowHorizontalLayout && horizontalArticles.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {horizontalArticles.map((article) => (
              <article key={article.id} className="group">
                <Link href={`${article.slug}`}>
                  <div className="relative w-full h-48 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={article.featuredImage || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <Badge variant="outline" className="mb-2">
                    {article.category?.name || article.type}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {stripHtmlTags(article.excerpt || article.content.substring(0, 150) + '...')}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>By {article.author?.name || 'Anonymous'}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(article.publishedAt || article.createdAt)}</span>
                    {article.viewCount && (
                      <>
                        <span>•</span>
                        <span>{article.viewCount} views</span>
                      </>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Latest section header and remaining articles */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Latest</h2>
        {!categorySlug && (
          <div className="flex space-x-4 text-sm">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                className={`font-medium transition-colors ${
                  activeCategory === category.slug
                    ? 'text-brand-primary border-b-2 border-brand-primary pb-1'
                    : 'text-gray-600 hover:text-brand-primary'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {remainingArticles.map((article) => (
          <article key={article.id} className="group flex space-x-4">
            <Link href={`${article.slug}`} className="flex-shrink-0">
              <div className="relative w-32 h-20 overflow-hidden rounded-lg">
                <Image
                  src={article.featuredImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`${article.slug}`}>
                <Badge variant="outline" className="mb-2">
                  {article.category?.name || article.type}
                </Badge>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {stripHtmlTags(article.excerpt || article.content.substring(0, 150) + '...')}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>By {article.author?.name || 'Anonymous'}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(article.publishedAt || article.createdAt)}</span>
                  {article.viewCount && (
                    <>
                      <span>•</span>
                      <span>{article.viewCount} views</span>
                    </>
                  )}
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'See More'}
          </Button>
        </div>
      )}
    </section>
  )
}
