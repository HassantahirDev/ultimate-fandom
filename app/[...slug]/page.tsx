import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HtmlContentViewer } from "@/components/ui/html-content-viewer"
import { LatestArticles } from "@/components/latest-articles"
import { Heart, Rss, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ApiService } from "@/lib/api"

interface PageProps {
  params: {
    slug: string[]
  }
}

interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  status: 'published' | 'draft'
  type: 'news' | 'review' | 'feature' | 'interview' | 'opinion' | 'list'
  featuredImage?: string
  featuredImageCaption?: string
  publishedAt?: string
  author?: {
    name: string
  }
  category?: {
    name: string
    slug: string
  }
  tags?: { name: string }[]
  createdAt: string
  updatedAt: string
}

async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await ApiService.getArticleBySlug(slug)
    const article = response as Article
    return article
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

// export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
//   const slug = '/' + (await params).slug.join('/')
//   const article = await getArticleBySlug(slug)

//   if (!article) {
//     return {
//       title: 'Page Not Found | ScreenRant',
//       description: 'The page you are looking for does not exist.',
//     }
//   }

//   return {
//     title: `${article.title} | ScreenRant`,
//     description: article.excerpt || `${article.title} - Read more on ScreenRant`,
//   }
// }

export default async function DynamicPage({ params }: PageProps) {
  const slugArray = (await params).slug
  const slug = '/' + slugArray.join('/')
  
  // Filter out system requests and browser-specific paths
  const systemPaths = [
    '.well-known',
    'favicon.ico',
    'robots.txt',
    'sitemap.xml',
    'manifest.json',
    '_next',
    'api',
    'admin'
  ]
  
  // Check if this is a system path or contains system paths
  const isSystemPath = systemPaths.some(systemPath => 
    slugArray.some(segment => segment.startsWith(systemPath) || segment.includes(systemPath))
  )
  
  // Also check for common file extensions that shouldn't be treated as articles
  const isFileRequest = slug.match(/\.(json|xml|txt|ico|png|jpg|jpeg|gif|svg|css|js|map)$/i)
  
  if (isSystemPath || isFileRequest) {
    notFound()
  }
  
  const article = await getArticleBySlug(slug)

  if (!article || article.status !== 'published') {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full">
        {/* Page Header */}
        <section className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center justify-between flex-1">
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl font-bold text-foreground">{article.title}</h1>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Rss className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Follow
                </Button>
              </div>
            </div>
            {article.excerpt && (
              <div className="text-muted-foreground text-lg max-w-3xl">
                <HtmlContentViewer content={article.excerpt} />
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          {article.featuredImage ? (
            // Two-column layout with featured image
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Featured Image Column */}
              <div className="relative">
                <div className="sticky top-4">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  {article.featuredImageCaption && (
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      {article.featuredImageCaption}
                    </p>
                  )}
                </div>
              </div>

              {/* Content Column */}
              <div>
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-brand-primary text-white hover:bg-brand-hover">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <article className="prose prose-lg max-w-none">
                  <div className="text-foreground">
                    <HtmlContentViewer content={article.content} />
                  </div>
                </article>
              </div>
            </div>
          ) : (
            // Single column layout without featured image
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                             {/* Article Content */}
               <div className="lg:col-span-2">
                 {/* Tags */}
                 {article.tags && article.tags.length > 0 && (
                   <div className="mb-6">
                     <div className="flex flex-wrap gap-2">
                       {article.tags.map((tag, index) => (
                         <Badge key={index} variant="secondary" className="bg-brand-primary text-white hover:bg-brand-hover">
                           {tag.name}
                         </Badge>
                       ))}
                     </div>
                   </div>
                 )}
                 
                 <article className="prose prose-lg max-w-none">
                   <div className="text-foreground">
                     <HtmlContentViewer content={article.content} />
                   </div>
                 </article>
               </div>
            </div>
          )}

          {/* Related Articles Section */}
          <section className="mt-16 border-t pt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {article.category?.name ? `More from ${article.category.name}` : 'Related Articles'}
              </h2>
              <p className="text-gray-600">
                Discover more articles {article.category?.name ? `in ${article.category.name}` : 'you might enjoy'}
              </p>
            </div>
            <LatestArticles 
              initialLimit={6}
              categorySlug={article.category?.slug}
              excludeArticleId={article.id}
            />
          </section>
        </section>
      </main>

      <Footer />
    </div>
  )
}