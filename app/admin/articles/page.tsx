'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ApiService, Article } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  FileText
} from 'lucide-react'
import { toast } from 'sonner'

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const articlesData = await ApiService.getArticles()
      setArticles(articlesData)
    } catch (error) {
      console.error('Error fetching articles:', error)
      toast.error('Failed to load articles')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return
    }

    try {
      await ApiService.deleteArticle(id)
      setArticles(articles.filter(article => article.id !== id))
      toast.success('Article deleted successfully')
    } catch (error) {
      console.error('Error deleting article:', error)
      toast.error('Failed to delete article')
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      if (newStatus === 'published') {
        await ApiService.publishArticle(id)
        toast.success('Article published successfully')
      } else if (newStatus === 'draft') {
        await ApiService.unpublishArticle(id)
        toast.success('Article unpublished successfully')
      } else {
        await ApiService.updateArticle(id, { status: newStatus as Article['status'] })
        toast.success('Article status updated successfully')
      }
      
      setArticles(articles.map(article => 
        article.id === id 
          ? { ...article, status: newStatus as Article['status'] }
          : article
      ))
    } catch (error) {
      console.error('Error updating article status:', error)
      toast.error('Failed to update article status')
    }
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter
    const matchesType = typeFilter === 'all' || article.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'default',
      draft: 'secondary',
      scheduled: 'outline',
      archived: 'destructive'
    }
    return variants[status as keyof typeof variants] || 'secondary'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
          <p className="text-muted-foreground">Manage your content articles</p>
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="feature">Feature</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="opinion">Opinion</SelectItem>
            <SelectItem value="list">List</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articles ({filteredArticles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' 
                  ? 'No articles found matching your filters.' 
                  : 'No articles found. Create your first article to get started.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{article.title}</div>
                        <div className="text-sm text-muted-foreground font-mono">
                          {article.slug}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {article.author?.name || 'Unknown Author'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {article.category?.name || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {article.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={article.status}
                        onValueChange={(value) => handleStatusChange(article.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge variant={getStatusBadge(article.status) as any}>
                            {article.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.viewCount || 0}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/articles/new?edit=${article.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`${encodeURIComponent(article.slug)}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(article.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 