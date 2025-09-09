import { ApiService, Article, Category, Tag, User, Comment, NavigationItem } from './api'

export interface AdminStats {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  totalUsers: number
  totalComments: number
  totalViews: number
  totalCategories: number
  totalTags: number
  totalMedia: number
  pendingComments: number
  activeUsers: number
  recentSignups: number
}

export interface AdminActivity {
  id: string
  type: 'article' | 'comment' | 'user' | 'category' | 'tag' | 'media'
  title: string
  description: string
  time: string
  status: string
  author?: string
  metadata?: Record<string, any>
}

export class AdminApiService extends ApiService {
  // Dashboard Analytics
  static async getDashboardStats(): Promise<AdminStats> {
    try {
      // Fetch all data in parallel for better performance with fallbacks
      const [
        articlesResult,
        usersResult, 
        commentsResult,
        categoriesResult,
        tagsResult,
        mediaResult
      ] = await Promise.allSettled([
        this.getArticles(),
        this.getUsers(),
        this.getComments(),
        this.getCategories(),
        this.getTags(),
        this.getMedia()
      ])

      // Safely extract arrays with fallbacks
      const articles = articlesResult.status === 'fulfilled' ? articlesResult.value : []
      const users = usersResult.status === 'fulfilled' ? usersResult.value : []
      const comments = commentsResult.status === 'fulfilled' ? commentsResult.value : []
      const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : []
      const tags = tagsResult.status === 'fulfilled' ? tagsResult.value : []
      const media = mediaResult.status === 'fulfilled' ? mediaResult.value : []

      // Ensure all variables are arrays
      const safeArticles = Array.isArray(articles) ? articles : []
      const safeUsers = Array.isArray(users) ? users : []
      const safeComments = Array.isArray(comments) ? comments : []
      const safeCategories = Array.isArray(categories) ? categories : []
      const safeTags = Array.isArray(tags) ? tags : []
      const safeMedia = Array.isArray(media) ? media : []

      // Calculate statistics
      const publishedArticles = safeArticles.filter(article => article.status === 'published').length
      const draftArticles = safeArticles.filter(article => article.status === 'draft').length
      const totalViews = safeArticles.reduce((sum, article) => sum + (article.viewCount || 0), 0)
      const pendingComments = safeComments.filter(comment => comment.status === 'pending').length
      const activeUsers = safeUsers.filter(user => user.status === 'active').length
      
      // Calculate recent signups (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const recentSignups = safeUsers.filter(user => 
        new Date(user.createdAt) > thirtyDaysAgo
      ).length

      return {
        totalArticles: safeArticles.length,
        publishedArticles,
        draftArticles,
        totalUsers: safeUsers.length,
        totalComments: safeComments.length,
        totalViews,
        totalCategories: safeCategories.length,
        totalTags: safeTags.length,
        totalMedia: safeMedia.length,
        pendingComments,
        activeUsers,
        recentSignups
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      // Return default stats instead of throwing
      return {
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        totalUsers: 0,
        totalComments: 0,
        totalViews: 0,
        totalCategories: 0,
        totalTags: 0,
        totalMedia: 0,
        pendingComments: 0,
        activeUsers: 0,
        recentSignups: 0
      }
    }
  }

  // Recent Activity Feed
  static async getRecentActivity(limit: number = 10): Promise<AdminActivity[]> {
    try {
      // Fetch recent data from all modules with fallbacks
      const [
        articlesResult,
        commentsResult,
        usersResult
      ] = await Promise.allSettled([
        this.getArticles({ limit: 5 }),
        this.getComments({ limit: 5 }),
        this.getUsers({ limit: 5 })
      ])

      // Safely extract arrays
      const recentArticles = articlesResult.status === 'fulfilled' && Array.isArray(articlesResult.value) 
        ? articlesResult.value : []
      const recentComments = commentsResult.status === 'fulfilled' && Array.isArray(commentsResult.value) 
        ? commentsResult.value : []
      const recentUsers = usersResult.status === 'fulfilled' && Array.isArray(usersResult.value) 
        ? usersResult.value : []

      const activities: AdminActivity[] = []

      // Add article activities
      recentArticles.forEach((article: Article) => {
        activities.push({
          id: `article-${article.id}`,
          type: 'article',
          title: article.status === 'published' ? 'Article Published' : 'Article Created',
          description: article.title,
          time: article.updatedAt || article.createdAt,
          status: article.status,
          author: article.author?.name,
          metadata: {
            articleId: article.id,
            category: article.category?.name
          }
        })
      })

      // Add comment activities
      recentComments.forEach((comment: Comment) => {
        activities.push({
          id: `comment-${comment.id}`,
          type: 'comment',
          title: 'New Comment',
          description: `Comment on "${comment.article?.title || 'Article'}"`,
          time: comment.createdAt,
          status: comment.status,
          author: comment.authorName,
          metadata: {
            commentId: comment.id,
            articleId: comment.article?.id
          }
        })
      })

      // Add user activities
      recentUsers.forEach((user: User) => {
        activities.push({
          id: `user-${user.id}`,
          type: 'user',
          title: 'New User Registration',
          description: `${user.username || user.email} joined`,
          time: user.createdAt,
          status: user.status,
          metadata: {
            userId: user.id,
            role: user.role
          }
        })
      })

      // Sort by time (most recent first) and limit results
      return activities
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, limit)

    } catch (error) {
      console.error('Error fetching recent activity:', error)
      // Return empty array instead of throwing
      return []
    }
  }

  // Enhanced Article Management
  static async getArticlesWithStats(params?: {
    page?: number
    limit?: number
    status?: string
    type?: string
    categoryId?: string
    search?: string
  }): Promise<{
    data: Article[]
    total: number
    pagination: {
      page: number
      limit: number
      hasMore: boolean
    }
  }> {
    try {
      const articles = await this.getArticles(params)
      
      // Enhance articles with additional stats
      const enhancedArticles = articles.map((article: Article) => ({
        ...article,
        viewCount: article.viewCount || 0,
        readTime: this.calculateReadTime(article.content || ''),
        lastModified: article.updatedAt || article.createdAt
      }))

      return {
        data: enhancedArticles,
        total: articles.length,
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          hasMore: articles.length === (params?.limit || 20)
        }
      }
    } catch (error) {
      console.error('Error fetching articles with stats:', error)
      throw new Error('Failed to fetch articles')
    }
  }

  // Enhanced User Management
  static async getUsersWithStats(params?: {
    page?: number
    limit?: number
    role?: string
    status?: string
    search?: string
  }): Promise<{
    data: (User & { accountAge: number; isActive: boolean })[]
    total: number
    pagination: {
      page: number
      limit: number
      hasMore: boolean
    }
  }> {
    try {
      const users = await this.getUsers(params)
      
      // Enhance users with additional stats
      const enhancedUsers = users.map((user) => ({
        ...user,
        accountAge: this.calculateAccountAge(user.createdAt),
        isActive: user.status === 'active'
      }))

      return {
        data: enhancedUsers,
        total: users.length,
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          hasMore: users.length === (params?.limit || 20)
        }
      }
    } catch (error) {
      console.error('Error fetching users with stats:', error)
      throw new Error('Failed to fetch users')
    }
  }

  // Comment Moderation
  static async moderateComment(commentId: string, action: 'approve' | 'reject' | 'spam'): Promise<Comment> {
    try {
      switch (action) {
        case 'approve':
          return await this.approveComment(commentId)
        case 'reject':
          return await this.rejectComment(commentId)
        case 'spam':
          return await this.markCommentAsSpam(commentId)
        default:
          throw new Error('Invalid moderation action')
      }
    } catch (error) {
      console.error(`Error moderating comment ${commentId}:`, error)
      throw new Error(`Failed to ${action} comment`)
    }
  }

  // Bulk Operations
  static async bulkUpdateArticles(articleIds: string[], updates: Partial<Article>): Promise<Article[]> {
    try {
      const promises = articleIds.map(id => this.updateArticle(id, updates))
      return await Promise.all(promises)
    } catch (error) {
      console.error('Error bulk updating articles:', error)
      throw new Error('Failed to bulk update articles')
    }
  }

  static async bulkDeleteArticles(articleIds: string[]): Promise<void> {
    try {
      const promises = articleIds.map(id => this.deleteArticle(id))
      await Promise.all(promises)
    } catch (error) {
      console.error('Error bulk deleting articles:', error)
      throw new Error('Failed to bulk delete articles')
    }
  }

  // Category Management with Slug Encoding
  static async getCategoryBySlugAdmin(slug: string): Promise<Category> {
    const encodedSlug = encodeURIComponent(slug)
    return this.getCategoryBySlug(encodedSlug)
  }

  static async getArticlesByCategorySlugAdmin(slug: string, limit?: number): Promise<Article[]> {
    const encodedSlug = encodeURIComponent(slug)
    return this.getArticlesByCategorySlug(encodedSlug, limit)
  }

  // Tag Management with Slug Encoding
  static async getTagBySlugAdmin(slug: string): Promise<Tag> {
    const encodedSlug = encodeURIComponent(slug)
    return this.getTagBySlug(encodedSlug)
  }

  static async searchTagsAdmin(query: string): Promise<Tag[]> {
    const encodedQuery = encodeURIComponent(query)
    return this.searchTags(encodedQuery)
  }

  // User Management with Username Encoding
  static async getUserByUsernameAdmin(username: string): Promise<User> {
    const encodedUsername = encodeURIComponent(username)
    return this.getUserByUsername(encodedUsername)
  }

  // Utility Methods
  private static calculateReadTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  private static calculateAccountAge(createdAt: string): number {
    const created = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // days
  }

  // System Health Check
  static async getSystemHealth(): Promise<{
    status: 'healthy' | 'warning' | 'error'
    services: Record<string, boolean>
    metrics: Record<string, number>
  }> {
    try {
      const startTime = Date.now()
      
      // Test all major services
      const serviceTests = await Promise.allSettled([
        this.getArticles({ limit: 1 }).then(() => true).catch(() => false),
        this.getCategories().then(() => true).catch(() => false),
        this.getTags().then(() => true).catch(() => false),
        this.getUsers({ limit: 1 }).then(() => true).catch(() => false),
        this.getComments({ limit: 1 }).then(() => true).catch(() => false)
      ])

      const responseTime = Date.now() - startTime
      
      const services = {
        articles: serviceTests[0].status === 'fulfilled' ? serviceTests[0].value : false,
        categories: serviceTests[1].status === 'fulfilled' ? serviceTests[1].value : false,
        tags: serviceTests[2].status === 'fulfilled' ? serviceTests[2].value : false,
        users: serviceTests[3].status === 'fulfilled' ? serviceTests[3].value : false,
        comments: serviceTests[4].status === 'fulfilled' ? serviceTests[4].value : false
      }

      const healthyServices = Object.values(services).filter(Boolean).length
      const totalServices = Object.keys(services).length
      
      let status: 'healthy' | 'warning' | 'error'
      if (healthyServices === totalServices) {
        status = 'healthy'
      } else if (healthyServices >= totalServices * 0.7) {
        status = 'warning'
      } else {
        status = 'error'
      }

      return {
        status,
        services,
        metrics: {
          responseTime,
          serviceUptime: (healthyServices / totalServices) * 100,
          totalServices,
          healthyServices
        }
      }
    } catch (error) {
      console.error('Error checking system health:', error)
      return {
        status: 'error',
        services: {},
        metrics: {
          responseTime: -1,
          serviceUptime: 0,
          totalServices: 0,
          healthyServices: 0
        }
      }
    }
  }
}

export default AdminApiService 