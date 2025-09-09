'use client'

import React, { useEffect, useState } from 'react'
import { ApiService, Tag } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
  Tag as TagIcon,
  Hash
} from 'lucide-react'
import { toast } from 'sonner'

interface TagFormData {
  name: string
  slug: string
  description: string
  color: string
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  
  const [formData, setFormData] = useState<TagFormData>({
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6'
  })

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      setLoading(true)
      const tagsData = await ApiService.getTags()
      setTags(tagsData)
    } catch (error) {
      console.error('Error fetching tags:', error)
      toast.error('Failed to load tags')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleInputChange = (field: keyof TagFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (field === 'name') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3B82F6'
    })
    setEditingTag(null)
  }

  const handleCreate = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag)
    setFormData({
      name: tag.name,
      slug: tag.slug,
      description: tag.description || '',
      color: tag.color || '#3B82F6'
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Tag name is required')
      return
    }

    try {
      setSubmitting(true)
      
      const tagData = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim() || undefined,
        color: formData.color
      }

      if (editingTag) {
        await ApiService.updateTag(editingTag.id, tagData)
        toast.success('Tag updated successfully')
      } else {
        await ApiService.createTag(tagData)
        toast.success('Tag created successfully')
      }
      
      setIsDialogOpen(false)
      resetForm()
      await fetchTags()
    } catch (error) {
      console.error('Error saving tag:', error)
      toast.error(editingTag ? 'Failed to update tag' : 'Failed to create tag')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag? This action cannot be undone.')) {
      return
    }

    try {
      await ApiService.deleteTag(id)
      toast.success('Tag deleted successfully')
      await fetchTags()
    } catch (error) {
      console.error('Error deleting tag:', error)
      toast.error('Failed to delete tag')
    }
  }

  const handleSearchTags = async (query: string) => {
    if (!query.trim()) {
      await fetchTags()
      return
    }

    try {
      const results = await ApiService.searchTags(query.trim())
      setTags(results)
    } catch (error) {
      console.error('Error searching tags:', error)
      toast.error('Failed to search tags')
    }
  }

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading tags...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
          <p className="text-muted-foreground">Manage content tags and labels</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Tag
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              // Optional: implement real-time search
              // handleSearchTags(e.target.value)
            }}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => handleSearchTags(searchTerm)}
          disabled={!searchTerm.trim()}
        >
          Search API
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tags ({filteredTags.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTags.length === 0 ? (
            <div className="text-center py-8">
              <TagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? 'No tags found matching your search.' : 'No tags found. Create your first tag to get started.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{tag.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {tag.slug}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      {tag.description ? (
                        <span className="text-muted-foreground truncate block">
                          {tag.description}
                        </span>
                      ) : (
                        <span className="text-muted-foreground italic">No description</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: tag.color || '#3B82F6' }}
                        />
                        <span className="text-xs text-muted-foreground font-mono">
                          {tag.color || '#3B82F6'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(tag.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(tag)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(tag.id)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingTag ? 'Edit Tag' : 'Create New Tag'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter tag name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="tag-slug"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter tag description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder="#3B82F6"
                  className="font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : (editingTag ? 'Update' : 'Create')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 