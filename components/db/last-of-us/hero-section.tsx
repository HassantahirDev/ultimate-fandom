import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users } from "lucide-react"

export function LastOfUsHero() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-80 h-[480px] overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/placeholder.svg?height=480&width=320"
                alt="The Last of Us poster"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-orange-500 text-white">TV-MA</Badge>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">The Last of Us</h1>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">8/10</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>259 reviews</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>8.3/10</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <Badge variant="outline">TV SERIES</Badge>
                <Badge variant="outline">2 SEASONS</Badge>
                <Badge variant="outline">2023 - 2025</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Drama</Badge>
                    <Badge>Action</Badge>
                    <Badge>Horror</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Runtime</h3>
                  <p className="text-muted-foreground">60m episodes</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">CREATORS</h3>
                  <p className="text-muted-foreground">Craig Mazin, Neil Druckmann</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">SHOWRUNNER</h3>
                  <p className="text-muted-foreground">Craig Mazin</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">DIRECTORS</h3>
                  <p className="text-muted-foreground">Craig Mazin, Peter Hoar, Jeremy Webb, Ali Abbasi</p>
                </div>
              </div>

              <div className="mt-6">
                <Button className="bg-brand-primary hover:bg-brand-hover">WHERE TO WATCH +</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
