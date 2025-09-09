// Define the Article type
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
    id: string
    name: string
    slug: string
  }
  tags?: { id: string; name: string; slug: string }[]
  createdAt: string
  updatedAt: string
  viewCount?: number
  isBreaking?: boolean
  isFeatured?: boolean
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
  parentId?: string
  parent?: Category
  children?: Category[]
  articles?: Article[]
  createdAt: string
  updatedAt: string
}

interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  createdAt: string
  updatedAt: string
}

interface User {
  id: string
  username: string
  email: string
  firstName?: string
  lastName?: string
  role: 'admin' | 'editor' | 'author' | 'subscriber'
  status: 'active' | 'inactive' | 'suspended'
  avatar?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

interface Comment {
  id: string
  content: string
  status: 'pending' | 'approved' | 'rejected' | 'spam'
  authorName: string
  authorEmail: string
  authorId?: string
  articleId: string
  article?: Article
  createdAt: string
  updatedAt: string
}

interface NavigationItem {
  id: string
  title: string
  link: string
  description?: string
  sortOrder: number
  isActive: boolean
  openInNewTab: boolean
  iconName?: string
  color?: string
  createdAt: string
  updatedAt: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }
      
      // Handle no content responses
      if (response.status === 204) {
        return null as T
      }
      
      // Check if response has content
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        // If it's not JSON, try to get text content
        const text = await response.text()
        if (!text.trim()) {
          return null as T
        }
        // If there's text content but it's not JSON, throw error
        throw new Error(`Expected JSON response but got: ${contentType}. Content: ${text}`)
      }
      
      // Try to parse JSON
      const text = await response.text()
      if (!text.trim()) {
        return null as T
      }
      
      try {
        return JSON.parse(text)
      } catch (parseError) {
        throw new Error(`Failed to parse JSON response: ${text}`)
      }
    } catch (error) {
      console.error('API request failed:', { url, error })
      throw error
    }
  }

  // Articles API
  static async getArticles(params?: {
    page?: number
    limit?: number
    offset?: number
    status?: string
    type?: string
    category?: string
    search?: string
  }): Promise<Article[]> {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const endpoint = `/articles${queryParams.toString() ? `?${queryParams}` : ''}`
    return this.request<Article[]>(endpoint)
  }

  static async getPublishedArticles(): Promise<Article[]> {
    return this.request<Article[]>('/articles/published')
  }

  static async getFeaturedArticles(): Promise<Article[]> {
    return this.request<Article[]>('/articles/featured')
  }

  static async getTrendingArticles(limit?: number): Promise<Article[]> {
    const endpoint = `/articles/trending${limit ? `?limit=${limit}` : ''}`
    return this.request<Article[]>(endpoint)
  }

  static async getPopularArticles(limit?: number, timeframe?: 'day' | 'week' | 'month'): Promise<Article[]> {
    const queryParams = new URLSearchParams()
    if (limit) queryParams.append('limit', limit.toString())
    if (timeframe) queryParams.append('timeframe', timeframe)
    
    const endpoint = `/articles/popular${queryParams.toString() ? `?${queryParams}` : ''}`
    return this.request<Article[]>(endpoint)
  }

  static async getBreakingArticles(): Promise<Article[]> {
    return this.request<Article[]>('/articles/breaking')
  }

  static async getArticlesByCategorySlug(slug: string, limit?: number): Promise<Article[]> {
    const encodedSlug = encodeURIComponent(slug)
    const endpoint = `/articles/category/${encodedSlug}${limit ? `?limit=${limit}` : ''}`
    return this.request<Article[]>(endpoint)
  }

  static async getLatestArticlesByCategory(slug: string, limit?: number): Promise<Article[]> {
    const encodedSlug = encodeURIComponent(slug)
    const endpoint = `/articles/category/${encodedSlug}/latest${limit ? `?limit=${limit}` : ''}`
    return this.request<Article[]>(endpoint)
  }

  static async getArticle(id: string): Promise<Article> {
    return this.request<Article>(`/articles/${id}`)
  }

  static async getArticleBySlug(slug: string): Promise<Article> {
    const encodedSlug = encodeURIComponent(slug)
    return this.request<Article>(`/articles/slug/${encodedSlug}`)
  }

  static async createArticle(data: Partial<Article>): Promise<Article> {
    return this.request<Article>('/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static async updateArticle(id: string, data: Partial<Article>): Promise<Article> {
    return this.request<Article>(`/articles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  static async deleteArticle(id: string): Promise<void> {
    return this.request<void>(`/articles/${id}`, {
      method: 'DELETE',
    })
  }

  static async publishArticle(id: string): Promise<Article> {
    return this.request<Article>(`/articles/${id}/publish`, {
      method: 'PATCH',
    })
  }

  static async unpublishArticle(id: string): Promise<Article> {
    return this.request<Article>(`/articles/${id}/unpublish`, {
      method: 'PATCH',
    })
  }

  // Categories API
  static async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories')
  }

  static async getRootCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories/roots')
  }

  static async getActiveCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories/active')
  }

  static async getCategory(id: string): Promise<Category> {
    return this.request<Category>(`/categories/${id}`)
  }

  static async getCategoryBySlug(slug: string): Promise<Category> {
    const encodedSlug = encodeURIComponent(slug)
    return this.request<Category>(`/categories/slug/${encodedSlug}`)
  }

  static async getCategoryDescendants(id: string): Promise<Category[]> {
    return this.request<Category[]>(`/categories/${id}/descendants`)
  }

  static async getCategoryAncestors(id: string): Promise<Category[]> {
    return this.request<Category[]>(`/categories/${id}/ancestors`)
  }

  static async createCategory(data: Partial<Category>): Promise<Category> {
    return this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    return this.request<Category>(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  static async deleteCategory(id: string): Promise<void> {
    return this.request<void>(`/categories/${id}`, {
      method: 'DELETE',
    })
  }

  // Tags API
  static async getTags(): Promise<Tag[]> {
    return this.request<Tag[]>('/tags')
  }

  static async getPopularTags(limit?: number): Promise<Tag[]> {
    const endpoint = `/tags/popular${limit ? `?limit=${limit}` : ''}`
    return this.request<Tag[]>(endpoint)
  }

  static async searchTags(query: string): Promise<Tag[]> {
    const encodedQuery = encodeURIComponent(query)
    return this.request<Tag[]>(`/tags/search?q=${encodedQuery}`)
  }

  static async getTag(id: string): Promise<Tag> {
    return this.request<Tag>(`/tags/${id}`)
  }

  static async getTagBySlug(slug: string): Promise<Tag> {
    const encodedSlug = encodeURIComponent(slug)
    return this.request<Tag>(`/tags/slug/${encodedSlug}`)
  }

  static async createTag(data: Partial<Tag>): Promise<Tag> {
    return this.request<Tag>('/tags', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static async updateTag(id: string, data: Partial<Tag>): Promise<Tag> {
    return this.request<Tag>(`/tags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  static async deleteTag(id: string): Promise<void> {
    return this.request<void>(`/tags/${id}`, {
      method: 'DELETE',
    })
  }

  // Users API
  static async getUsers(params?: {
    page?: number
    limit?: number
    role?: string
    status?: string
    search?: string
  }): Promise<User[]> {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const endpoint = `/users${queryParams.toString() ? `?${queryParams}` : ''}`
    return this.request<User[]>(endpoint)
  }

  static async getAuthors(): Promise<User[]> {
    return this.request<User[]>('/users/authors')
  }

  static async getUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`)
  }

  static async getUserByUsername(username: string): Promise<User> {
    const encodedUsername = encodeURIComponent(username)
    return this.request<User>(`/users/username/${encodedUsername}`)
  }

  static async createUser(data: Partial<User>): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  static async deleteUser(id: string): Promise<void> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    })
  }

  static async activateUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}/activate`, {
      method: 'PATCH',
    })
  }

  static async deactivateUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}/deactivate`, {
      method: 'PATCH',
    })
  }

  static async suspendUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}/suspend`, {
      method: 'PATCH',
    })
  }

  // Comments API
  static async getComments(params?: {
    page?: number
    limit?: number
    status?: string
    articleId?: string
  }): Promise<Comment[]> {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const endpoint = `/comments${queryParams.toString() ? `?${queryParams}` : ''}`
    return this.request<Comment[]>(endpoint)
  }

  static async getPendingComments(): Promise<Comment[]> {
    return this.request<Comment[]>('/comments/pending')
  }

  static async getCommentsByArticle(articleId: string): Promise<Comment[]> {
    return this.request<Comment[]>(`/comments/article/${articleId}`)
  }

  static async getComment(id: string): Promise<Comment> {
    return this.request<Comment>(`/comments/${id}`)
  }

  static async createComment(data: Partial<Comment>): Promise<Comment> {
    return this.request<Comment>('/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static async updateComment(id: string, data: Partial<Comment>): Promise<Comment> {
    return this.request<Comment>(`/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  static async deleteComment(id: string): Promise<void> {
    return this.request<void>(`/comments/${id}`, {
      method: 'DELETE',
    })
  }

  static async approveComment(id: string): Promise<Comment> {
    return this.request<Comment>(`/comments/${id}/approve`, {
      method: 'PATCH',
    })
  }

  static async rejectComment(id: string): Promise<Comment> {
    return this.request<Comment>(`/comments/${id}/reject`, {
      method: 'PATCH',
    })
  }

  static async markCommentAsSpam(id: string): Promise<Comment> {
    return this.request<Comment>(`/comments/${id}/spam`, {
      method: 'PATCH',
    })
  }

  // Media API (assuming it exists based on folder structure)
  static async getMedia(params?: {
    page?: number
    limit?: number
    type?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const endpoint = `/media${queryParams.toString() ? `?${queryParams}` : ''}`
    return this.request(endpoint)
  }

  static async uploadMedia(file: File, data?: any) {
    const formData = new FormData()
    formData.append('file', file)
    
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
    }

    return this.request('/media', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type header to let browser set it with boundary
    })
  }

  static async deleteMedia(id: string) {
    return this.request(`/media/${id}`, {
      method: 'DELETE',
    })
  }

  // Dashboard and Analytics API
  static async getDashboardStats() {
    return this.request('/dashboard/stats')
  }

  static async getAnalytics(params?: {
    startDate?: string
    endDate?: string
    metric?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const endpoint = `/analytics${queryParams.toString() ? `?${queryParams}` : ''}`
    return this.request(endpoint)
  }

  // Authentication API (assuming it exists)
  static async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  static async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }

  static async getCurrentUser() {
    return this.request('/auth/me')
  }

  static async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    })
  }

  static async searchArticles(query: string, limit?: number): Promise<Article[]> {
    const queryParams = new URLSearchParams()
    queryParams.append('q', query)
    if (limit) queryParams.append('limit', limit.toString())
    
    const endpoint = `/articles/search?${queryParams}`
    return this.request<Article[]>(endpoint)
  }

  // Navigation API
  static async getNavigationItems(): Promise<NavigationItem[]> {
    return this.request<NavigationItem[]>('/navigation')
  }

  static async getActiveNavigationItems(): Promise<NavigationItem[]> {
    return this.request<NavigationItem[]>('/navigation/active')
  }

  static async getNavigationItem(id: string): Promise<NavigationItem> {
    return this.request<NavigationItem>(`/navigation/${id}`)
  }

  static async createNavigationItem(data: Partial<NavigationItem>): Promise<NavigationItem> {
    return this.request<NavigationItem>('/navigation', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static async updateNavigationItem(id: string, data: Partial<NavigationItem>): Promise<NavigationItem> {
    return this.request<NavigationItem>(`/navigation/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  static async deleteNavigationItem(id: string): Promise<void> {
    return this.request<void>(`/navigation/${id}`, {
      method: 'DELETE',
    })
  }

  static async updateNavigationSortOrder(items: { id: string; sortOrder: number }[]): Promise<{ message: string; updated: number }> {
    return this.request<{ message: string; updated: number }>('/navigation/sort-order', {
      method: 'PATCH',
      body: JSON.stringify(items),
    })
  }

  static async toggleNavigationItemActive(id: string): Promise<NavigationItem> {
    return this.request<NavigationItem>(`/navigation/${id}/toggle-active`, {
      method: 'PATCH',
    })
  }
}

// Export types for use in components
export type { Article, Category, Tag, User, Comment, NavigationItem }

export default ApiService 