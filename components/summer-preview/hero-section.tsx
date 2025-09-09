import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, User } from "lucide-react"

export function SummerPreviewHero() {
  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="relative h-[600px] overflow-hidden">
        <Image
          src="https://sjc.microlink.io/nQ-MkflPxXTHNdRk_MIArTOhOPHVdapzD5r9Q0FGdHSxu8NJNQVNuc-D-hPmSIsEdZvRXWjEHl0cqV5clxMwwA.jpeg"
          alt="ScreenRant's 2025 Summer Movie Preview"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-brand-primary text-white hover:bg-brand-hover">Jurassic World Rebirth</Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                ScreenRant's 2025 Summer Movie Preview: Exclusive Images From 39 New & Upcoming Movies
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Article Meta */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Author and Date */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm text-foreground">
                    By <span className="font-medium">Brennan Klein</span> &{" "}
                    <span className="font-medium">Rob Keyes</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Published May 14, 2025</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Follow
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Thread
                <Badge variant="secondary" className="ml-1">
                  5
                </Badge>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
