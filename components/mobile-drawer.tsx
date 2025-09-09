"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, X, ChevronDown, User, Mail, Youtube, Facebook, Instagram, Twitter } from "lucide-react"
import { SignInModal } from "@/components/auth/sign-in-modal"

interface MobileDrawerProps {
  onClose: () => void
}

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  // Placeholder state for user session
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>([])
  const [showSignInModal, setShowSignInModal] = useState(false)

  const mockUser = {
    name: "John Doe"
  }

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const navigationSections = [
    {
      title: "Movies",
      href: "/movies",
      submenu: [
        { title: "Movie Features", href: "/movie-features" },
        { title: "Movie News", href: "/movie-news" },
        { title: "Movie Reviews", href: "/movie-reviews" },
        { title: "Movie Lists", href: "/movie-lists" },
        { title: "Movie Trailers", href: "/movie-trailers" },
      ],
    },
    {
      title: "TV",
      href: "/tv",
      submenu: [
        { title: "TV Features", href: "/tv-features" },
        { title: "TV News", href: "/tv-news" },
        { title: "TV Reviews", href: "/tv-reviews" },
        { title: "TV Lists", href: "/tv-lists" },
      ],
    },
    {
      title: "Reality TV",
      href: "/reality-tv",
      submenu: [
        { title: "Reality TV Features", href: "/reality-tv-features" },
        { title: "Reality TV News", href: "/reality-tv-news" },
        { title: "Reality TV Lists", href: "/reality-tv-lists" },
      ],
    },
    {
      title: "Gaming",
      href: "/gaming",
      submenu: [
        { title: "Game Features", href: "/game-features" },
        { title: "Game News", href: "/game-news" },
        { title: "Game Guides", href: "/game-guides" },
        { title: "Game Reviews", href: "/game-reviews" },
        { title: "Game Lists", href: "/game-lists" },
      ],
    },
    {
      title: "Comics",
      href: "/comics",
      submenu: [
        { title: "Comic Features", href: "/comics-features" },
        { title: "Comic News", href: "/comics-news" },
        { title: "Comic Reviews", href: "/comics-reviews" },
        { title: "Comic Lists", href: "/comics-lists" },
      ],
    },
    {
      title: "Anime",
      href: "/anime",
      submenu: [
        { title: "Anime Features", href: "/anime-features" },
        { title: "Anime News", href: "/anime-news" },
        { title: "Anime Lists", href: "/anime-lists" },
      ],
    },
    {
      title: "Music",
      href: "/music",
      submenu: [
        { title: "Music Features", href: "/music-features" },
        { title: "Music Lists", href: "/music-lists" },
      ],
    },
    {
      title: "WWE",
      href: "/wwe",
      submenu: [
        { title: "WWE News", href: "/wwe-news" },
        { title: "WWE Features", href: "/wwe-features" },
        { title: "WWE Lists", href: "/wwe-lists" },
      ],
    },
  ]

  const simpleLinks = [
    { title: "Videos", href: "/videos" },
    { title: "Threads", href: "/threads" },
  ]

  const moreSection = {
    title: "More",
    submenu: [
      { title: "Lists", href: "/lists" },
      { title: "Interviews", href: "/interviews" },
      { title: "Podcasts", href: "/podcasts" },
    ],
  }

  return (
    <>
      <div className="flex flex-col h-full bg-background">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
         
        </div>

        {/* Navigation content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {/* Main navigation sections */}
            {navigationSections.map((section) => (
              <Collapsible
                key={section.title}
                open={openSections.includes(section.title)}
                onOpenChange={() => toggleSection(section.title)}
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={section.href}
                    className="flex-1 py-2 text-foreground hover:text-brand-primary font-medium"
                    onClick={onClose}
                  >
                    {section.title}
                  </Link>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openSections.includes(section.title) ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="ml-4 space-y-1">
                  {section.submenu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block py-2 text-sm text-muted-foreground hover:text-brand-primary"
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}

            {/* Simple links */}
            {simpleLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block py-2 text-foreground hover:text-brand-primary font-medium"
                onClick={onClose}
              >
                {link.title}
              </Link>
            ))}

            {/* More section */}
            <Collapsible
              open={openSections.includes(moreSection.title)}
              onOpenChange={() => toggleSection(moreSection.title)}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1 py-2 text-foreground font-medium">{moreSection.title}</span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openSections.includes(moreSection.title) ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="ml-4 space-y-1">
                {moreSection.submenu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-brand-primary"
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </nav>

          {/* User features */}
          <div className="border-t border-border p-4 space-y-2">
            <button
              onClick={() => !isSignedIn && setShowSignInModal(true)}
              className="flex items-center space-x-3 py-2 text-foreground hover:text-brand-primary w-full text-left"
            >
              <User className="h-5 w-5" />
              <span>{isSignedIn ? mockUser.name || "Account" : "Sign in"}</span>
            </button>
            <Link
              href="/newsletter"
              className="flex items-center space-x-3 py-2 text-foreground hover:text-brand-primary"
              onClick={onClose}
            >
              <Mail className="h-5 w-5" />
              <span>Newsletter</span>
            </Link>
          </div>

          {/* Social media */}
          <div className="border-t border-border p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Follow Us</h3>
            <div className="grid grid-cols-4 gap-3">
              <a href="https://www.youtube.com/user/screenrant" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="w-full">
                  <Youtube className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://www.facebook.com/ScreenRant" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="w-full">
                  <Facebook className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://www.instagram.com/screenrant/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="w-full">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://twitter.com/screenrant" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="w-full">
                  <Twitter className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <SignInModal 
        open={showSignInModal} 
        onOpenChange={(open) => {
          setShowSignInModal(open)
          // Simulate sign in for demo purposes
          if (!open && showSignInModal) {
            setTimeout(() => {
              setIsSignedIn(true)
            }, 1000)
          }
        }} 
      />
    </>
  )
}
