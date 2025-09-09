'use client'

import React, { useEffect, useState } from 'react'
import { AdminApiService } from '@/lib/admin-api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Upload, 
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Trash2,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  Grid3X3,
  List,
  Copy,
  Edit
} from 'lucide-react'

interface MediaFile {
  id: string
  originalName: string
  filename: string
  url: string
  type: 'image' | 'video' | 'audio' | 'document'
  mimeType: string
  size: number
  width?: number
  height?: number
  duration?: number
  description?: string
  altText?: string
  caption?: string
  createdAt: string
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  useEffect(() => {
    fetchMediaFiles()
  }, [])

  const fetchMediaFiles = async () => {
    try {
      setLoading(true)
      const response = await AdminApiService.getMedia({ limit: 1000 })
      
      // Handle different response formats
      const mediaData = (response as any)?.data || (response as any) || []
      
      // Transform API data to match our interface
      const transformedMedia = mediaData.map((media: any) => {
        // Determine file type from mime type
        let type: 'image' | 'video' | 'audio' | 'document' = 'document'
        if (media.mimeType?.startsWith('image/')) type = 'image'
        else if (media.mimeType?.startsWith('video/')) type = 'video'
        else if (media.mimeType?.startsWith('audio/')) type = 'audio'
        
        return {
          id: media.id,
          originalName: media.originalName || media.name || 'unknown.file',
          filename: media.filename || media.fileName || media.originalName,
          url: media.url || media.path || '',
          type,
          mimeType: media.mimeType || 'application/octet-stream',
          size: media.size || 0,
          width: media.width || media.metadata?.width,
          height: media.height || media.metadata?.height,
          duration: media.duration || media.metadata?.duration,
          description: media.description || '',
          altText: media.altText || media.alt || '',
          caption: media.caption || '',
          createdAt: media.createdAt
        }
      })
      
      setMediaFiles(transformedMedia)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching media files:', error)
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this media file? This action cannot be undone.')) {
      try {
        await AdminApiService.deleteMedia(id)
        setMediaFiles(mediaFiles.filter(file => file.id !== id))
      } catch (error) {
        console.error('Error deleting media file:', error)
      }
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    try {
      // Upload each file
      const uploadPromises = Array.from(files).map(file => 
        AdminApiService.uploadMedia(file)
      )
      
      await Promise.all(uploadPromises)
      setIsUploadDialogOpen(false)
      fetchMediaFiles()
    } catch (error) {
      console.error('Error uploading files:', error)
    }
  }

  const filteredMedia = mediaFiles.filter(file => {
    const matchesSearch = 
      file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.altText?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'all' || file.type === typeFilter
    
    return matchesSearch && matchesType
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-5 h-5" />
      case 'video': return <Video className="w-5 h-5" />
      case 'audio': return <Music className="w-5 h-5" />
      case 'document': return <FileText className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'image': return 'default'
      case 'video': return 'secondary'
      case 'audio': return 'outline'
      case 'document': return 'destructive'
      default: return 'outline'
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    // TODO: Show toast notification
  }

  const showFileDetails = (file: MediaFile) => {
    setSelectedFile(file)
    setIsDetailsDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading media files...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediaFiles.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mediaFiles.filter(f => f.type === 'image').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mediaFiles.filter(f => f.type === 'video').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatFileSize(mediaFiles.reduce((sum, file) => sum + file.size, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Files</CardTitle>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((file) => (
                <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    {getFileIcon(file.type)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => showFileDetails(file)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyToClipboard(file.url)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {file.type === 'image' && (
                    <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                      <img 
                        src={file.url} 
                        alt={file.altText || file.originalName}
                        className="max-w-full max-h-full rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                      <div className="hidden">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                  )}
                  
                  {file.type !== 'image' && (
                    <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium truncate">
                      {file.originalName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </div>
                    <Badge variant={getTypeBadgeColor(file.type) as any} className="text-xs">
                      {file.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div>
                      <div className="font-medium">{file.originalName}</div>
                      <div className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {new Date(file.createdAt).toLocaleDateString()}
                        {file.width && file.height && ` • ${file.width}×${file.height}`}
                        {file.duration && ` • ${formatDuration(file.duration)}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getTypeBadgeColor(file.type) as any}>
                      {file.type}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => showFileDetails(file)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyToClipboard(file.url)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Media Files</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Upload files
                  </span>
                  <span className="text-sm text-gray-500"> or drag and drop</span>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, GIF, MP4, MP3, PDF up to 10MB
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>
          
          {selectedFile && (
            <div className="space-y-4">
              {selectedFile.type === 'image' && (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src={selectedFile.url} 
                    alt={selectedFile.altText || selectedFile.originalName}
                    className="max-w-full max-h-full rounded"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium">File Name</Label>
                  <p>{selectedFile.originalName}</p>
                </div>
                <div>
                  <Label className="font-medium">File Type</Label>
                  <p>{selectedFile.mimeType}</p>
                </div>
                <div>
                  <Label className="font-medium">File Size</Label>
                  <p>{formatFileSize(selectedFile.size)}</p>
                </div>
                <div>
                  <Label className="font-medium">Upload Date</Label>
                  <p>{new Date(selectedFile.createdAt).toLocaleDateString()}</p>
                </div>
                {selectedFile.width && selectedFile.height && (
                  <div>
                    <Label className="font-medium">Dimensions</Label>
                    <p>{selectedFile.width} × {selectedFile.height} pixels</p>
                  </div>
                )}
                {selectedFile.duration && (
                  <div>
                    <Label className="font-medium">Duration</Label>
                    <p>{formatDuration(selectedFile.duration)}</p>
                  </div>
                )}
              </div>
              
              <div>
                <Label className="font-medium">URL</Label>
                <div className="flex space-x-2 mt-1">
                  <Input value={selectedFile.url} readOnly />
                  <Button size="sm" onClick={() => copyToClipboard(selectedFile.url)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {selectedFile.description && (
                <div>
                  <Label className="font-medium">Description</Label>
                  <p className="text-sm">{selectedFile.description}</p>
                </div>
              )}
              
              {selectedFile.altText && (
                <div>
                  <Label className="font-medium">Alt Text</Label>
                  <p className="text-sm">{selectedFile.altText}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 