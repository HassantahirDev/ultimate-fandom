'use client'

import React, { useEffect, useState } from 'react'
import { AdminApiService } from '@/lib/admin-api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  MessageSquare,
  Share,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalViews: number
    totalUsers: number
    totalComments: number
    totalShares: number
    viewsChange: number
    usersChange: number
    commentsChange: number
    sharesChange: number
  }
  topArticles: Array<{
    id: string
    title: string
    views: number
    comments: number
    shares: number
    publishedAt: string
  }>
  trafficSources: Array<{
    source: string
    visits: number
    percentage: number
  }>
  popularCategories: Array<{
    name: string
    views: number
    articles: number
  }>
  recentActivity: Array<{
    type: 'view' | 'comment' | 'share'
    article: string
    count: number
    time: string
  }>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      
      // Fetch analytics data using the AdminApiService
      const [dashboardStats, recentActivity, articlesResponse] = await Promise.all([
        AdminApiService.getDashboardStats(),
        AdminApiService.getRecentActivity(10),
        AdminApiService.getArticlesWithStats({ limit: 100 })
      ])

      // Calculate top articles from articles data
      const articles = articlesResponse?.data || []
      const topArticles = articles
        .sort((a: any, b: any) => (b.viewCount || 0) - (a.viewCount || 0))
        .slice(0, 5)
        .map((article: any) => ({
          id: article.id,
          title: article.title,
          views: article.viewCount || 0,
          comments: article.commentCount || 0,
          shares: article.shareCount || 0,
          publishedAt: article.publishedAt || article.createdAt
        }))

      // Transform the data to match our analytics interface
      const analyticsData: AnalyticsData = {
        overview: {
          totalViews: dashboardStats.totalViews,
          totalUsers: dashboardStats.totalUsers,
          totalComments: dashboardStats.totalComments,
          totalShares: topArticles.reduce((sum: number, article: any) => sum + article.shares, 0),
          viewsChange: 12.5, // TODO: Calculate actual change
          usersChange: 8.3,   // TODO: Calculate actual change
          commentsChange: -2.1, // TODO: Calculate actual change
          sharesChange: 15.7   // TODO: Calculate actual change
        },
        topArticles,
        trafficSources: [
          { source: 'Direct', visits: Math.floor(dashboardStats.totalViews * 0.35), percentage: 35.0 },
          { source: 'Google Search', visits: Math.floor(dashboardStats.totalViews * 0.30), percentage: 30.0 },
          { source: 'Social Media', visits: Math.floor(dashboardStats.totalViews * 0.18), percentage: 18.0 },
          { source: 'Referral', visits: Math.floor(dashboardStats.totalViews * 0.12), percentage: 12.0 },
          { source: 'Email', visits: Math.floor(dashboardStats.totalViews * 0.05), percentage: 5.0 }
        ],
        popularCategories: [
          { name: 'Movie Reviews', views: Math.floor(dashboardStats.totalViews * 0.25), articles: Math.floor(dashboardStats.totalArticles * 0.2) },
          { name: 'TV News', views: Math.floor(dashboardStats.totalViews * 0.20), articles: Math.floor(dashboardStats.totalArticles * 0.3) },
          { name: 'Movie News', views: Math.floor(dashboardStats.totalViews * 0.18), articles: Math.floor(dashboardStats.totalArticles * 0.25) },
          { name: 'Gaming', views: Math.floor(dashboardStats.totalViews * 0.15), articles: Math.floor(dashboardStats.totalArticles * 0.15) },
          { name: 'Comics', views: Math.floor(dashboardStats.totalViews * 0.12), articles: Math.floor(dashboardStats.totalArticles * 0.1) }
        ],
        recentActivity: recentActivity.slice(0, 5).map(activity => ({
          type: activity.type === 'article' ? 'view' : activity.type === 'comment' ? 'comment' : 'share',
          article: activity.description,
          count: Math.floor(Math.random() * 100) + 50, // Placeholder count
          time: formatTimeAgo(activity.time)
        }))
      }
      
      setAnalytics(analyticsData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setLoading(false)
    }
  }

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
    
    return date.toLocaleDateString()
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    )
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'view': return <Eye className="w-4 h-4 text-blue-500" />
      case 'comment': return <MessageSquare className="w-4 h-4 text-green-500" />
      case 'share': return <Share className="w-4 h-4 text-purple-500" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading analytics...</div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Failed to load analytics data</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalViews)}</div>
            <div className="flex items-center space-x-1 text-xs">
              {getChangeIcon(analytics.overview.viewsChange)}
              <span className={getChangeColor(analytics.overview.viewsChange)}>
                {Math.abs(analytics.overview.viewsChange)}%
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalUsers)}</div>
            <div className="flex items-center space-x-1 text-xs">
              {getChangeIcon(analytics.overview.usersChange)}
              <span className={getChangeColor(analytics.overview.usersChange)}>
                {Math.abs(analytics.overview.usersChange)}%
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalComments)}</div>
            <div className="flex items-center space-x-1 text-xs">
              {getChangeIcon(analytics.overview.commentsChange)}
              <span className={getChangeColor(analytics.overview.commentsChange)}>
                {Math.abs(analytics.overview.commentsChange)}%
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <Share className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalShares)}</div>
            <div className="flex items-center space-x-1 text-xs">
              {getChangeIcon(analytics.overview.sharesChange)}
              <span className={getChangeColor(analytics.overview.sharesChange)}>
                {Math.abs(analytics.overview.sharesChange)}%
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Top Performing Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Shares</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.topArticles.map((article, index) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                        <span className="font-medium text-sm truncate max-w-48">
                          {article.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{formatNumber(article.views)}</TableCell>
                    <TableCell>{formatNumber(article.comments)}</TableCell>
                    <TableCell>{formatNumber(article.shares)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {formatNumber(source.visits)}
                    </span>
                    <Badge variant="outline">
                      {source.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatNumber(category.views)}</div>
                    <div className="text-xs text-gray-500">
                      {category.articles} articles
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getActivityIcon(activity.type)}
                    <div>
                      <div className="font-medium text-sm">{activity.article}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatNumber(activity.count)}</div>
                    <div className="text-xs text-gray-500 capitalize">
                      {activity.type}s
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">2.5min</div>
              <div className="text-sm text-gray-500">Average Session Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">3.2</div>
              <div className="text-sm text-gray-500">Pages per Session</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">35%</div>
              <div className="text-sm text-gray-500">Bounce Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 