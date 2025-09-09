import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, User } from "lucide-react"

export function CoverStoryHero() {
  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="relative h-[700px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=700&width=1200"
          alt="Ana de Armas in Ballerina"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-brand-primary text-brand-primary-foreground hover:bg-brand-hover text-lg px-4 py-2">COVER STORY</Badge>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">Ballerina</h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Ana de Armas takes center stage in the John Wick universe's most anticipated spinoff
              </p>
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
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-foreground">
                    By <span className="font-medium">Sarah Mitchell</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Published May 15, 2025</div>
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
                  12
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
