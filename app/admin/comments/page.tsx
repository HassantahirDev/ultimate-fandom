'use client'

import React, { useEffect, useState } from 'react'
import { ApiService, Comment } from '@/lib/api'
import { AdminApiService } from '@/lib/admin-api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
  Search,
  MoreHorizontal,
  Check,
  X,
  AlertTriangle,
  MessageSquare,
  Clock,
  Trash2,
  Eye
} from 'lucide-react'
import { toast } from 'sonner'

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const commentsData = await ApiService.getComments()
      setComments(Array.isArray(commentsData) ? commentsData : [])
    } catch (error) {
      console.error('Error fetching comments:', error)
      toast.error('Failed to load comments')
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  const handleModeration = async (commentId: string, action: 'approve' | 'reject' | 'spam') => {
    try {
      await AdminApiService.moderateComment(commentId, action)
      
      // Update local state
      setComments(Array.isArray(comments) ? comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'spam' }
          : comment
      ) : [])

      const actionText = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'marked as spam'
      toast.success(`Comment ${actionText} successfully`)
    } catch (error) {
      console.error(`Error ${action}ing comment:`, error)
      toast.error(`Failed to ${action} comment`)
    }
  }

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      return
    }

    try {
      await ApiService.deleteComment(commentId)
      setComments(Array.isArray(comments) ? comments.filter(comment => comment.id !== commentId) : [])
      toast.success('Comment deleted successfully')
    } catch (error) {
      console.error('Error deleting comment:', error)
      toast.error('Failed to delete comment')
    }
  }

  const filteredComments = (Array.isArray(comments) ? comments : []).filter(comment => {
    const matchesSearch = 
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.authorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.article?.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
      spam: 'destructive'
    }
    return variants[status as keyof typeof variants] || 'secondary'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-3 w-3" />
      case 'rejected':
        return <X className="h-3 w-3" />
      case 'spam':
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getAuthorInitials = (comment: Comment) => {
    const names = comment.authorName.split(' ')
    return names.length >= 2 
      ? (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
      : comment.authorName.charAt(0).toUpperCase()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading comments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comments</h1>
          <p className="text-muted-foreground">Moderate and manage user comments</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Array.isArray(comments) ? comments.length : 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Array.isArray(comments) ? comments.filter(c => c.status === 'pending').length : 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Array.isArray(comments) ? comments.filter(c => c.status === 'approved').length : 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Spam/Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {Array.isArray(comments) ? comments.filter(c => c.status === 'spam' || c.status === 'rejected').length : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search comments..."
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="spam">Spam</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comments ({filteredComments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredComments.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No comments found matching your filters.' 
                  : 'No comments found.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Article</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{getAuthorInitials(comment)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{comment.authorName}</div>
                          <div className="text-sm text-muted-foreground">
                            {comment.authorEmail}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="truncate">
                        {comment.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      {comment.article ? (
                        <div className="max-w-[200px] truncate">
                          {comment.article.title}
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic">Unknown</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(comment.status) as any} className="gap-1">
                        {getStatusIcon(comment.status)}
                        {comment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {comment.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleModeration(comment.id, 'approve')}
                              className="h-8 px-2 text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleModeration(comment.id, 'reject')}
                              className="h-8 px-2 text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {comment.status !== 'approved' && (
                              <DropdownMenuItem onClick={() => handleModeration(comment.id, 'approve')}>
                                <Check className="mr-2 h-4 w-4 text-green-600" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {comment.status !== 'rejected' && (
                              <DropdownMenuItem onClick={() => handleModeration(comment.id, 'reject')}>
                                <X className="mr-2 h-4 w-4 text-red-600" />
                                Reject
                              </DropdownMenuItem>
                            )}
                            {comment.status !== 'spam' && (
                              <DropdownMenuItem onClick={() => handleModeration(comment.id, 'spam')}>
                                <AlertTriangle className="mr-2 h-4 w-4 text-orange-600" />
                                Mark as Spam
                              </DropdownMenuItem>
                            )}
                            {comment.article && (
                              <DropdownMenuItem asChild>
                                <a 
                                  href={`${encodeURIComponent(comment.article.slug)}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Article
                                </a>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => handleDelete(comment.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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