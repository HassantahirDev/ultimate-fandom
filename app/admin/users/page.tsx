'use client'

import React, { useEffect, useState } from 'react'
import { ApiService, User } from '@/lib/api'
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
  Plus, 
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield,
  Users
} from 'lucide-react'
import { toast } from 'sonner'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const usersData = await ApiService.getUsers()
      setUsers(usersData)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (userId: string, newStatus: User['status']) => {
    try {
      if (newStatus === 'active') {
        await ApiService.activateUser(userId)
        toast.success('User activated successfully')
      } else if (newStatus === 'inactive') {
        await ApiService.deactivateUser(userId)
        toast.success('User deactivated successfully')
      } else if (newStatus === 'suspended') {
        await ApiService.suspendUser(userId)
        toast.success('User suspended successfully')
      }
      
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus }
          : user
      ))
    } catch (error) {
      console.error('Error updating user status:', error)
      toast.error('Failed to update user status')
    }
  }

  const handleRoleChange = async (userId: string, newRole: User['role']) => {
    try {
      await ApiService.updateUser(userId, { role: newRole })
      toast.success('User role updated successfully')
      
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, role: newRole }
          : user
      ))
    } catch (error) {
      console.error('Error updating user role:', error)
      toast.error('Failed to update user role')
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      await ApiService.deleteUser(userId)
      setUsers(users.filter(user => user.id !== userId))
      toast.success('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  const filteredUsers = users.filter(user => {
    const searchText = searchTerm.toLowerCase()
    const matchesSearch = 
      user.firstName?.toLowerCase().includes(searchText) ||
      user.lastName?.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.username.toLowerCase().includes(searchText)
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'destructive',
      editor: 'default',
      author: 'secondary',
      subscriber: 'outline'
    }
    return variants[role as keyof typeof variants] || 'outline'
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      suspended: 'destructive'
    }
    return variants[status as keyof typeof variants] || 'secondary'
  }

  const getUserInitials = (user: User) => {
    const firstName = user.firstName || user.username || user.email
    const lastName = user.lastName || ''
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New User
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="subscriber">Subscriber</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' 
                  ? 'No users found matching your filters.' 
                  : 'No users found.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {user.firstName || user.lastName 
                              ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                              : user.username || 'Unknown User'}
                          </div>
                          {user.bio && (
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {user.bio}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {user.username}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleRoleChange(user.id, value as User['role'])}
                      >
                        <SelectTrigger className="w-32">
                          <Badge variant={getRoleBadge(user.role) as any}>
                            <Shield className="w-3 h-3 mr-1" />
                            {user.role}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="author">Author</SelectItem>
                          <SelectItem value="subscriber">Subscriber</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.status}
                        onValueChange={(value) => handleStatusChange(user.id, value as User['status'])}
                      >
                        <SelectTrigger className="w-32">
                          <Badge variant={getStatusBadge(user.status) as any}>
                            {user.status === 'active' ? <UserCheck className="w-3 h-3 mr-1" /> : 
                             user.status === 'suspended' ? <UserX className="w-3 h-3 mr-1" /> : null}
                            {user.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(user.id)}
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