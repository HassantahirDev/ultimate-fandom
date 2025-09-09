import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SidebarItem {
  title: string
  author?: string
  time?: string
  rating?: string
  image?: string
  href: string
  subtitle?: string
  extra?: string
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
  type: 'articles' | 'list' | 'stats' | 'upcoming'
}

interface CategorySidebarProps {
  sections: SidebarSection[]
  newsletterTitle?: string
  newsletterDescription?: string
}

export function CategorySidebar({ 
  sections, 
  newsletterTitle = "Newsletter",
  newsletterDescription = "Get the latest updates delivered to your inbox."
}: CategorySidebarProps) {
  const renderSidebarItem = (item: SidebarItem, type: string) => {
    switch (type) {
      case 'articles':
        return (
          <div className="flex space-x-3">
            {item.image && (
              <Link href={item.href} className="flex-shrink-0">
                <div className="relative w-16 h-12 overflow-hidden rounded">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
              </Link>
            )}
            <div className="flex-1 min-w-0">
              <Link href={item.href}>
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-brand-primary transition-colors">
                  {item.title}
                </h4>
                {item.rating && (
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {item.rating}
                    </Badge>
                  </div>
                )}
                {item.author && item.time && (
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <span>By {item.author}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                )}
              </Link>
            </div>
          </div>
        )
      
      case 'list':
        return (
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-gray-900 hover:text-brand-primary cursor-pointer transition-colors">
                {item.title}
              </h4>
              {item.subtitle && <p className="text-xs text-gray-500">{item.subtitle}</p>}
            </div>
            {item.extra && <span className="text-sm font-medium text-brand-primary">{item.extra}</span>}
          </div>
        )
      
      case 'stats':
        return (
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 hover:text-brand-primary cursor-pointer transition-colors">
                {item.title}
              </h4>
              {item.subtitle && <p className="text-xs text-gray-500">{item.subtitle}</p>}
              {item.extra && <p className="text-xs text-gray-400">{item.extra}</p>}
            </div>
          </div>
        )
      
      case 'upcoming':
        return (
          <div className="flex space-x-3">
            {item.image && (
              <div className="relative w-12 h-8 flex-shrink-0 overflow-hidden rounded">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 hover:text-brand-primary cursor-pointer transition-colors">
                {item.title}
              </h4>
              {item.subtitle && item.extra && (
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>{item.subtitle}</span>
                  <span>•</span>
                  <span>{item.extra}</span>
                </div>
              )}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {sections.map((section, sectionIndex) => (
        <Card key={sectionIndex}>
          <CardHeader>
            <CardTitle className="text-lg font-bold">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`space-y-${section.type === 'articles' ? '4' : '3'}`}>
              {section.items.map((item, index) => (
                <div key={index}>
                  {renderSidebarItem(item, section.type)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Newsletter Signup */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">{newsletterTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">{newsletterDescription}</p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-md hover:bg-brand-hover transition-colors">
              Subscribe
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 