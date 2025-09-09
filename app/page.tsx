import { Header } from "@/components/header"
import { FeaturedSection } from "@/components/featured-section"
import { PopularNews } from "@/components/popular-news"
import { ExclusiveStories } from "@/components/exclusive-stories"
import { LatestArticles } from "@/components/latest-articles"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { ApiService } from "@/lib/api"
import { Suspense } from "react"

// Loading component for sections
function SectionSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Add error handling and type safety
async function getHomePageData() {
  try {
    const [
      featuredArticles,
      popularArticles,
      trendingArticles,
      exclusiveArticles,
      latestArticles,
      sidebarTrendingArticles,
      popularTags
    ] = await Promise.allSettled([
      ApiService.getFeaturedArticles(),
      ApiService.getPopularArticles(6, 'week'),
      ApiService.getTrendingArticles(4),
      ApiService.getArticles({ 
        status: 'published', 
        type: 'feature',
        limit: 3 
      }),
      ApiService.getPublishedArticles(),
      ApiService.getTrendingArticles(3), // Additional trending articles for sidebar
      ApiService.getPopularTags(8) // Popular tags for trending topics
    ])

    return {
      featuredArticles: featuredArticles.status === 'fulfilled' ? featuredArticles.value : [],
      popularArticles: popularArticles.status === 'fulfilled' ? popularArticles.value : [],
      trendingArticles: trendingArticles.status === 'fulfilled' ? trendingArticles.value : [],
      exclusiveArticles: exclusiveArticles.status === 'fulfilled' ? exclusiveArticles.value : [],
      latestArticles: latestArticles.status === 'fulfilled' ? latestArticles.value : [],
      sidebarTrendingArticles: sidebarTrendingArticles.status === 'fulfilled' ? sidebarTrendingArticles.value : [],
      popularTags: popularTags.status === 'fulfilled' ? popularTags.value : []
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    // Return empty arrays as fallback
    return {
      featuredArticles: [],
      popularArticles: [],
      trendingArticles: [],
      exclusiveArticles: [],
      latestArticles: [],
      sidebarTrendingArticles: [],
      popularTags: []
    }
  }
}

export default async function HomePage() {
  const {
    featuredArticles,
    popularArticles,
    trendingArticles,
    exclusiveArticles,
    latestArticles,
    sidebarTrendingArticles,
    popularTags
  } = await getHomePageData()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedSection 
            featuredArticle={featuredArticles[0]} 
            secondaryArticles={trendingArticles} 
          />
        </Suspense>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Suspense fallback={<SectionSkeleton />}>
            <PopularNews articles={popularArticles} />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <ExclusiveStories articles={exclusiveArticles} />
          </Suspense>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2">
              <Suspense fallback={<SectionSkeleton />}>
                <LatestArticles />
              </Suspense>
            </div>
            <div className="lg:col-span-1">
              <Suspense fallback={<SectionSkeleton />}>
                <Sidebar 
                  trendingArticles={sidebarTrendingArticles}
                  popularTags={popularTags}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
