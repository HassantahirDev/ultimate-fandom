'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AdminApiService } from '@/lib/admin-api'
import { ApiService } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { HtmlContentViewer } from '@/components/ui/html-content-viewer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  Save, 
  ArrowLeft,
  X,
  Plus,
  Upload
} from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
}

interface Tag {
  id: string
  name: string
  slug: string
}

interface ArticleFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  featuredImageCaption: string
  status: 'draft' | 'published' | 'scheduled' | 'archived'
  type: 'news' | 'review' | 'feature' | 'interview' | 'opinion' | 'list'
  categoryId: string
  tagIds: string[]
  scheduledAt: string
  allowComments: boolean
  isFeatured: boolean
  isBreaking: boolean
  metaDescription: string
  metaKeywords: string
}

function ArticlePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const isEditing = !!editId
  
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTagName, setNewTagName] = useState('')
  
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    featuredImageCaption: '',
    status: 'draft',
    type: 'news',
    categoryId: '',
    tagIds: [],
    scheduledAt: '',
    allowComments: true,
    isFeatured: false,
    isBreaking: false,
    metaDescription: '',
    metaKeywords: ''
  })

  useEffect(() => {
    fetchCategories()
    fetchTags()
    if (isEditing && editId) {
      fetchArticleForEdit(editId)
    }
  }, [isEditing, editId])

  const fetchCategories = async () => {
    try {
      const response = await AdminApiService.getCategories()
      const categoriesData = (response as any)?.data || (response as any) || []
      
      const transformedCategories = categoriesData.map((category: any) => ({
        id: category.id,
        name: category.name,
        slug: category.slug
      }))
      
      setCategories(transformedCategories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await AdminApiService.getTags()
      const tagsData = (response as any)?.data || (response as any) || []
      
      const transformedTags = tagsData.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug
      }))
      
      setTags(transformedTags)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  const fetchArticleForEdit = async (articleId: string) => {
    try {
      setLoading(true)
      const article = await ApiService.getArticle(articleId)
      
      // Auto-fill form with article data
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        featuredImage: article.featuredImage || '',
        featuredImageCaption: article.featuredImageCaption || '',
        status: article.status || 'draft',
        type: article.type || 'news',
        categoryId: article.category?.id || '',
        tagIds: article.tags?.map(tag => tag.id) || [],
        scheduledAt: '',
        allowComments: true,
        isFeatured: false,
        isBreaking: false,
        metaDescription: '',
        metaKeywords: ''
      })
      
      // Set selected tags
      if (article.tags) {
        setSelectedTags(article.tags.map(tag => tag.id))
      }
    } catch (error) {
      console.error('Error fetching article for edit:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleInputChange = (field: keyof ArticleFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-generate slug when title changes
    if (field === 'title') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }))
    }
  }

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  const handleAddNewTag = async () => {
    if (newTagName.trim()) {
      try {
        const newTagData = {
          name: newTagName.trim(),
          slug: generateSlug(newTagName.trim()),
          description: ''
        }
        
        const response = await AdminApiService.createTag(newTagData)
        const newTag = (response as any)?.data || response
        
        setTags(prev => [...prev, {
          id: newTag.id,
          name: newTag.name,
          slug: newTag.slug
        }])
        setSelectedTags(prev => [...prev, newTag.id])
        setNewTagName('')
      } catch (error) {
        console.error('Error creating tag:', error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const articleData = {
        ...formData,
        tagIds: selectedTags,
        // Ensure status is compatible with API
        status: formData.status === 'scheduled' || formData.status === 'archived' ? 'draft' : formData.status,
        // Handle scheduledAt properly - only include if it's a valid date string
        scheduledAt: formData.scheduledAt && formData.scheduledAt.trim() ? formData.scheduledAt : undefined,
        // Only include categoryId if it's not empty
        categoryId: formData.categoryId || undefined
      }

      // Remove undefined fields to avoid sending them to the API
      Object.keys(articleData).forEach(key => {
        if (articleData[key as keyof typeof articleData] === undefined) {
          delete articleData[key as keyof typeof articleData]
        }
      })

      if (isEditing && editId) {
        await AdminApiService.updateArticle(editId, articleData)
      } else {
        await AdminApiService.createArticle(articleData)
      }
      
      router.push('/admin/articles')
    } catch (error) {
      console.error('Error saving article:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDraft = async () => {
    setLoading(true)
    
    try {
      const articleData = {
        ...formData,
        tagIds: selectedTags,
        status: 'draft' as const,
        // Handle scheduledAt properly - only include if it's a valid date string
        scheduledAt: formData.scheduledAt && formData.scheduledAt.trim() ? formData.scheduledAt : undefined,
        // Only include categoryId if it's not empty
        categoryId: formData.categoryId || undefined
      }

      // Remove undefined fields to avoid sending them to the API
      Object.keys(articleData).forEach(key => {
        if (articleData[key as keyof typeof articleData] === undefined) {
          delete articleData[key as keyof typeof articleData]
        }
      })

      if (isEditing && editId) {
        await AdminApiService.updateArticle(editId, articleData)
      } else {
        await AdminApiService.createArticle(articleData)
      }
      
      router.push('/admin/articles')
    } catch (error) {
      console.error('Error saving article as draft:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    setLoading(true)
    
    try {
      const articleData = {
        ...formData,
        tagIds: selectedTags,
        status: 'published' as const,
        // Handle scheduledAt properly - only include if it's a valid date string
        scheduledAt: formData.scheduledAt && formData.scheduledAt.trim() ? formData.scheduledAt : undefined,
        // Only include categoryId if it's not empty
        categoryId: formData.categoryId || undefined
      }

      // Remove undefined fields to avoid sending them to the API
      Object.keys(articleData).forEach(key => {
        if (articleData[key as keyof typeof articleData] === undefined) {
          delete articleData[key as keyof typeof articleData]
        }
      })

      if (isEditing && editId) {
        await AdminApiService.updateArticle(editId, articleData)
      } else {
        await AdminApiService.createArticle(articleData)
      }
      
      router.push('/admin/articles')
    } catch (error) {
      console.error('Error publishing article:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/articles">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Article' : 'Create New Article'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter article title..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="article-slug"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <RichTextEditor
                  value={formData.excerpt}
                  onChange={(value) => handleInputChange('excerpt', value)}
                  placeholder="Brief description of the article..."
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Tabs defaultValue="editor" className="mt-2">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="editor" className="mt-0">
                    <RichTextEditor
                      value={formData.content}
                      onChange={(value) => handleInputChange('content', value)}
                      placeholder="Write your article content here..."
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="mt-0">
                    <div className="border rounded-md p-4 min-h-[200px] bg-white">
                      {formData.content ? (
                        <HtmlContentViewer content={formData.content} />
                      ) : (
                        <p className="text-gray-500 italic">No content to preview yet. Start writing to see the preview.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="SEO meta description..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Article Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="opinion">Opinion</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === 'scheduled' && (
                <div>
                  <Label htmlFor="scheduledAt">Scheduled Date</Label>
                  <Input
                    id="scheduledAt"
                    type="datetime-local"
                    value={formData.scheduledAt}
                    onChange={(e) => handleInputChange('scheduledAt', e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowComments"
                    checked={formData.allowComments}
                    onCheckedChange={(checked) => handleInputChange('allowComments', checked)}
                  />
                  <Label htmlFor="allowComments">Allow Comments</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                  />
                  <Label htmlFor="isFeatured">Featured Article</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isBreaking"
                    checked={formData.isBreaking}
                    onCheckedChange={(checked) => handleInputChange('isBreaking', checked)}
                  />
                  <Label htmlFor="isBreaking">Breaking News</Label>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button 
                  type="button" 
                  onClick={handleSaveDraft}
                  variant="outline" 
                  className="w-full"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update as Draft' : 'Save as Draft'}
                </Button>
                <Button 
                  type="button"
                  onClick={handlePublish}
                  className="w-full"
                  disabled={loading}
                >
                  {isEditing ? 'Update & Publish' : 'Publish Article'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tagId) => {
                  const tag = tags.find(t => t.id === tagId)
                  return tag ? (
                    <Badge key={tagId} variant="secondary" className="cursor-pointer">
                      {tag.name}
                      <X 
                        className="w-3 h-3 ml-1" 
                        onClick={() => handleTagToggle(tagId)}
                      />
                    </Badge>
                  ) : null
                })}
              </div>

              <div className="space-y-2">
                <Label>Available Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.filter(tag => !selectedTags.includes(tag.id)).map((tag) => (
                    <Badge 
                      key={tag.id} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleTagToggle(tag.id)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="New tag name"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm"
                  onClick={handleAddNewTag}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="featuredImage">Image URL</Label>
                <Input
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="featuredImageCaption">Image Caption</Label>
                <Input
                  id="featuredImageCaption"
                  value={formData.featuredImageCaption}
                  onChange={(e) => handleInputChange('featuredImageCaption', e.target.value)}
                  placeholder="Image caption..."
                />
              </div>

              <Button type="button" variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
} 


export default function NewArticlePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    }>
      <ArticlePage />
    </Suspense>
  )
} 