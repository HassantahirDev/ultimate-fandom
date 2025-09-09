'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  GripVertical, 
  Eye, 
  EyeOff,
  ExternalLink,
  Save,
  X
} from 'lucide-react'
import { toast } from 'sonner'
import { ApiService, NavigationItem } from '@/lib/api'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface NavigationFormData {
  title: string
  link: string
  description: string
  isActive: boolean
  openInNewTab: boolean
  iconName: string
  color: string
}

// Sortable Row Component
function SortableRow({ 
  item, 
  onEdit, 
  onDelete, 
  onToggleActive 
}: { 
  item: NavigationItem
  onEdit: (item: NavigationItem) => void
  onDelete: (item: NavigationItem) => void
  onToggleActive: (item: NavigationItem) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <TableRow ref={setNodeRef} style={style} className={isDragging ? 'z-50' : ''}>
      <TableCell>
        <div className="flex items-center">
          <div
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-sm text-gray-600 ml-2">{item.sortOrder}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <span className="font-medium">{item.title}</span>
          {item.color && (
            <div
              className="w-3 h-3 rounded-full border"
              style={{ backgroundColor: item.color }}
            />
          )}
        </div>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
            {item.link}
          </span>
          {item.openInNewTab && (
            <ExternalLink className="w-3 h-3 text-gray-400" />
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant={item.isActive ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => onToggleActive(item)}
        >
          {item.isActive ? (
            <>
              <Eye className="w-3 h-3 mr-1" />
              Active
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3 mr-1" />
              Inactive
            </>
          )}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline">
          {item.openInNewTab ? 'New Tab' : 'Same Tab'}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(item)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default function NavigationManagement() {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<NavigationFormData>({
    title: '',
    link: '',
    description: '',
    isActive: true,
    openInNewTab: false,
    iconName: '',
    color: ''
  })

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Fetch navigation items
  const fetchNavigationItems = async () => {
    try {
      setLoading(true)
      const items = await ApiService.getNavigationItems()
      setNavigationItems(items)
    } catch (error) {
      console.error('Error fetching navigation items:', error)
      toast.error('Failed to load navigation items')
    } finally {
      setLoading(false)
    }
  }

  // Handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = navigationItems.findIndex((item) => item.id === active.id)
    const newIndex = navigationItems.findIndex((item) => item.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    // Update local state immediately for better UX
    const newItems = arrayMove(navigationItems, oldIndex, newIndex)
    
    // Update sort orders
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      sortOrder: index + 1
    }))
    
    setNavigationItems(updatedItems)

    try {
      // Send update to backend
      const sortOrderUpdates = updatedItems.map((item) => ({
        id: item.id,
        sortOrder: item.sortOrder
      }))
      
      const response = await ApiService.updateNavigationSortOrder(sortOrderUpdates)
      toast.success(response?.message || 'Navigation order updated successfully')
    } catch (error) {
      console.error('Error updating navigation order:', error)
      toast.error('Failed to update navigation order')
      // Revert the local changes if the API call fails
      await fetchNavigationItems()
    }
  }

  useEffect(() => {
    fetchNavigationItems()
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingItem) {
        // Update existing item
        await ApiService.updateNavigationItem(editingItem.id, formData)
        toast.success('Navigation item updated successfully')
      } else {
        // Create new item
        await ApiService.createNavigationItem({
          ...formData,
          sortOrder: navigationItems.length + 1
        })
        toast.success('Navigation item created successfully')
      }
      
      // Reset form and close dialog
      setFormData({
        title: '',
        link: '',
        description: '',
        isActive: true,
        openInNewTab: false,
        iconName: '',
        color: ''
      })
      setEditingItem(null)
      setIsDialogOpen(false)
      
      // Refresh the list
      await fetchNavigationItems()
    } catch (error) {
      console.error('Error saving navigation item:', error)
      toast.error('Failed to save navigation item')
    }
  }

  // Handle edit
  const handleEdit = (item: NavigationItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      link: item.link,
      description: item.description || '',
      isActive: item.isActive,
      openInNewTab: item.openInNewTab,
      iconName: item.iconName || '',
      color: item.color || ''
    })
    setIsDialogOpen(true)
  }

  // Handle delete
  const handleDelete = async (item: NavigationItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) {
      return
    }

    try {
      await ApiService.deleteNavigationItem(item.id)
      toast.success('Navigation item deleted successfully')
      await fetchNavigationItems()
    } catch (error) {
      console.error('Error deleting navigation item:', error)
      toast.error('Failed to delete navigation item')
    }
  }

  // Handle toggle active status
  const handleToggleActive = async (item: NavigationItem) => {
    try {
      await ApiService.toggleNavigationItemActive(item.id)
      toast.success(`Navigation item ${item.isActive ? 'deactivated' : 'activated'}`)
      await fetchNavigationItems()
    } catch (error) {
      console.error('Error toggling navigation item:', error)
      toast.error('Failed to update navigation item status')
    }
  }

  // Handle new item dialog
  const handleNewItem = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      link: '',
      description: '',
      isActive: true,
      openInNewTab: false,
      iconName: '',
      color: ''
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Navigation Management</h1>
          <p className="text-gray-600 mt-2">Manage header navigation items and their order</p>
        </div>
        <Button onClick={handleNewItem}>
          <Plus className="w-4 h-4 mr-2" />
          Add Navigation Item
        </Button>
      </div>

      {/* Navigation Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Items</CardTitle>
          <CardDescription>
            Drag the grip handle (⋮⋮) to reorder navigation items. Changes are saved automatically. Click on status badges to toggle active/inactive state.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-lg text-gray-600">Loading navigation items...</div>
            </div>
          ) : navigationItems.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-4">No navigation items found</p>
                <Button onClick={handleNewItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Navigation Item
                </Button>
              </div>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <SortableContext 
                    items={navigationItems.map(item => item.id)} 
                    strategy={verticalListSortingStrategy}
                  >
                    {navigationItems.map((item) => (
                      <SortableRow
                        key={item.id}
                        item={item}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleActive={handleToggleActive}
                      />
                    ))}
                  </SortableContext>
                </TableBody>
              </Table>
            </DndContext>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}
            </DialogTitle>
            <DialogDescription>
              {editingItem 
                ? 'Update the navigation item details below.'
                : 'Create a new navigation item for the header menu.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Marvel, Star Wars"
                  required
                />
              </div>
              <div>
                <Label htmlFor="link">Link *</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="e.g., /tag/marvel/, https://example.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description for admin reference"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="iconName">Icon Name</Label>
                <Input
                  id="iconName"
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  placeholder="e.g., star, film, tv (Lucide icons)"
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="openInNewTab"
                  checked={formData.openInNewTab}
                  onCheckedChange={(checked) => setFormData({ ...formData, openInNewTab: checked })}
                />
                <Label htmlFor="openInNewTab">Open in new tab</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 