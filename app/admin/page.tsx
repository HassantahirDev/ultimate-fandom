'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Eye,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { AdminApiService, AdminStats, AdminActivity } from '@/lib/admin-api'

// Use AdminStats and AdminActivity from admin-api instead of local interfaces

interface Article {
  id: string
  title: string
  status: string
  createdAt: string
  updatedAt: string
  author?: { name: string }
  viewCount?: number
}

interface User {
  id: string
  username: string
  email: string
  role: string
  status: string
  createdAt: string
}

interface Comment {
  id: string
  content: string
  status: string
  createdAt: string
  author?: { name: string }
  article?: { title: string }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<AdminActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Use the new AdminApiService for better performance and consistency
        const [dashboardStats, recentActivities] = await Promise.all([
          AdminApiService.getDashboardStats(),
          AdminApiService.getRecentActivity(5)
        ])

        setStats(dashboardStats)
        setRecentActivity(recentActivities)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to load dashboard data. Please try again.')
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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

  const parseTimeAgo = (timeString: string): number => {
    if (timeString === 'Just now') return 0
    
    const match = timeString.match(/(\d+)\s+(minute|hour|day)s?\s+ago/)
    if (!match) return 0
    
    const value = parseInt(match[1])
    const unit = match[2]
    
    switch (unit) {
      case 'minute': return value
      case 'hour': return value * 60
      case 'day': return value * 60 * 24
      default: return 0
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">{error}</div>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">No data available</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <Link href="/admin/articles/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArticles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedArticles} published, {stats.draftArticles} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              User engagement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Article views
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tags</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTags}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMedia}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'article' ? 'bg-blue-500' :
                        activity.type === 'comment' ? 'bg-green-500' :
                        activity.type === 'user' ? 'bg-purple-500' :
                        activity.type === 'category' ? 'bg-orange-500' :
                        activity.type === 'tag' ? 'bg-pink-500' :
                        activity.type === 'media' ? 'bg-indigo-500' :
                        'bg-gray-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(activity.time)}
                          {activity.author && ` • by ${activity.author}`}
                        </p>
                      </div>
                    </div>
                    <Badge variant={
                      activity.status === 'published' || activity.status === 'active' ? 'default' : 
                      activity.status === 'pending' ? 'secondary' : 
                      'outline'
                    }>
                      {activity.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/articles/new">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Article
                </Button>
              </Link>
              <Link href="/admin/categories">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Manage Categories
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/comments">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Review Comments
                </Button>
              </Link>
              <Link href="/admin/tags">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Manage Tags
                </Button>
              </Link>
              <Link href="/admin/media">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Media Library
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 