import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DatabaseHero } from "@/components/db/database-hero"
import { CategoryGrid } from "@/components/db/category-grid"
import { FeaturedContent } from "@/components/db/featured-content"
import { TrendingNow } from "@/components/db/trending-now"
import { PopularSearches } from "@/components/db/popular-searches"
import { ApiService } from "@/lib/api"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SR Database | ScreenRant",
  description: "Explore movies, TV shows, actors, and more in the comprehensive Screen Rant entertainment database.",
}

async function fetchDatabaseData() {
  try {
    const [
      categories,
      featuredArticles,
      trendingArticles,
      popularArticles,
      popularTags
    ] = await Promise.all([
      ApiService.getRootCategories().catch(() => []),
      ApiService.getFeaturedArticles().catch(() => []),
      ApiService.getTrendingArticles(6).catch(() => []),
      ApiService.getPopularArticles(10, 'week').catch(() => []),
      ApiService.getPopularTags(10).catch(() => [])
    ])

    return {
      categories,
      featuredArticles,
      trendingArticles,
      popularArticles,
      popularTags
    }
  } catch (error) {
    console.error('Failed to fetch database data:', error)
    return {
      categories: [],
      featuredArticles: [],
      trendingArticles: [],
      popularArticles: [],
      popularTags: []
    }
  }
}

export default async function DatabasePage() {
  const data = await fetchDatabaseData()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        <DatabaseHero categories={data.categories} />
        
        {data.categories.length > 0 && (
          <CategoryGrid categories={data.categories} />
        )}
        
        {data.featuredArticles.length > 0 && (
          <FeaturedContent articles={data.featuredArticles} />
        )}

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {data.trendingArticles.length > 0 && (
              <TrendingNow articles={data.trendingArticles} />
            )}
            {data.popularTags.length > 0 && (
              <PopularSearches tags={data.popularTags} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
