"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Database, MessageSquare, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { MobileDrawer } from "@/components/mobile-drawer"
import { UserMenu } from "@/components/auth/user-menu"
import { useRouter, usePathname } from "next/navigation"
import { ApiService, NavigationItem } from "@/lib/api"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Fetch navigation items on component mount
  useEffect(() => {
    const fetchNavigationItems = async () => {
      try {
        const items = await ApiService.getActiveNavigationItems()
        setNavigationItems(items)
      } catch (error) {
        console.error('Error fetching navigation items:', error)
        // Fallback to default items if API fails
        setNavigationItems([
          { id: '1', title: "Trending", link: "/", sortOrder: 1, isActive: true, openInNewTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '2', title: "SR Exclusives", link: "/sr-originals", sortOrder: 2, isActive: true, openInNewTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '3', title: "SR Database", link: "/db", sortOrder: 3, isActive: true, openInNewTab: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchNavigationItems()
  }, [])


  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <MobileDrawer onClose={() => setIsDrawerOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="text-2xl font-bold text-brand-primary">
              ScreenRant
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
               <Link href={'/db'}>
            <Button variant="ghost" size="sm">
              <Database className="h-5 w-5" />
            </Button>
               </Link>
              <Link href={'/threads'}>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-5 w-5" />
            </Button>
              </Link>
            <UserMenu />
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="hidden md:flex items-center space-x-6 py-4 border-t border-border overflow-x-auto">
          {loading ? (
            <div className="flex items-center space-x-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            navigationItems.map((item: NavigationItem) => {
              const isActive = pathname === item.link || 
                             (item.link !== "/" && pathname?.startsWith(item.link));
              
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className={`font-medium whitespace-nowrap text-sm transition-colors ${
                    isActive 
                      ? "text-brand-primary border-b-2 border-brand-primary pb-1" 
                      : "text-foreground hover:text-brand-primary"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })
          )}
        </nav>
      </div>
    </header>
  )
}
