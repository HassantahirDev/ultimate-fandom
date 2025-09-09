'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  Users,
  Tags,
  FolderOpen,
  MessageSquare,
  Image,
  Settings,
  BarChart3,
  Navigation
} from 'lucide-react'

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Articles',
    href: '/admin/articles',
    icon: FileText,
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: FolderOpen,
  },
  {
    name: 'Tags',
    href: '/admin/tags',
    icon: Tags,
  },
  {
    name: 'Navigation',
    href: '/admin/navigation',
    icon: Navigation,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Comments',
    href: '/admin/comments',
    icon: MessageSquare,
  },
  {
    name: 'Media',
    href: '/admin/media',
    icon: Image,
  },
  // {
  //   name: 'Analytics',
  //   href: '/admin/analytics',
  //   icon: BarChart3,
  // },
  // {
  //   name: 'Settings',
  //   href: '/admin/settings',
  //   icon: Settings,
  // },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-white w-64 shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Screen Rant</h1>
        <p className="text-sm text-gray-600">Admin Panel</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
} 