'use client'

import React, { useEffect, useState } from 'react'
import { ApiService, Category } from '@/lib/api'
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
  DialogTrigger,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  FolderOpen,
  FolderClosed,
  Hash,
  AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'

interface CategoryFormData {
  name: string
  slug: string
  description: string
  image: string
  color: string
  parentId: string
  sortOrder: number
  isActive: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    image: '',
    color: '#3B82F6',
    parentId: '',
    sortOrder: 0,
    isActive: true
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const categoriesData = await ApiService.getCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
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

  const handleInputChange = (field: keyof CategoryFormData, value: any) => {
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
      image: '',
      color: '#3B82F6',
      parentId: '',
      sortOrder: 0,
      isActive: true
    })
    setEditingCategory(null)
  }

  const handleCreate = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image: category.image || '',
      color: category.color || '#3B82F6',
      parentId: category.parentId || '',
      sortOrder: category.sortOrder,
      isActive: category.isActive
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Category name is required')
      return
    }

    try {
      setSubmitting(true)
      
      const categoryData = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim() || undefined,
        image: formData.image.trim() || undefined,
        color: formData.color,
        parentId: formData.parentId || undefined,
        sortOrder: formData.sortOrder,
        isActive: formData.isActive
      }

      if (editingCategory) {
        await ApiService.updateCategory(editingCategory.id, categoryData)
        toast.success('Category updated successfully')
      } else {
        await ApiService.createCategory(categoryData)
        toast.success('Category created successfully')
      }
      
      setIsDialogOpen(false)
      resetForm()
      await fetchCategories()
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error(editingCategory ? 'Failed to update category' : 'Failed to create category')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return
    }

    try {
      await ApiService.deleteCategory(id)
      toast.success('Category deleted successfully')
      await fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  const flattenCategories = (categories: Category[]): Category[] => {
    const result: Category[] = []
    
    const flatten = (cats: Category[], level: number = 0) => {
      cats.forEach(cat => {
        result.push({ ...cat, level } as Category & { level: number })
        if (cat.children && cat.children.length > 0) {
          flatten(cat.children, level + 1)
        }
      })
    }
    
    flatten(categories)
    return result
  }

  const filteredCategories = flattenCategories(categories).filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderCategoryRow = (category: Category & { level?: number }) => (
    <TableRow key={category.id}>
      <TableCell>
        <div className="flex items-center gap-2">
          <div style={{ marginLeft: `${(category.level || 0) * 20}px` }}>
            {category.level && category.level > 0 && (
              <span className="text-muted-foreground">└─ </span>
            )}
            <span className="font-medium">{category.name}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary" className="font-mono text-xs">
          {category.slug}
        </Badge>
      </TableCell>
      <TableCell>
        <div 
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: category.color || '#3B82F6' }}
        />
      </TableCell>
      <TableCell>
        <Badge variant={category.isActive ? 'default' : 'secondary'}>
          {category.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {category.articles?.length || 0} articles
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">
        {new Date(category.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(category)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleDelete(category.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )

  const parentCategories = categories.filter(cat => !cat.parentId)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-muted-foreground">Manage your content categories</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories ({filteredCategories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCategories.length === 0 ? (
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? 'No categories found matching your search.' : 'No categories found. Create your first category to get started.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map(renderCategoryRow)}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="category-slug"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter category description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentId">Parent Category</Label>
              <Select
                value={formData.parentId || "none"}
                onValueChange={(value) => handleInputChange('parentId', value === "none" ? "" : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Root Category)</SelectItem>
                  {parentCategories
                    .filter(cat => !editingCategory || cat.id !== editingCategory.id)
                    .map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isActive">Active</Label>
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
                {submitting ? 'Saving...' : (editingCategory ? 'Update' : 'Create')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 