import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LastOfUsDetails() {
  const cast = [
    {
      name: "Pedro Pascal",
      character: "Joel Miller",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Bella Ramsey",
      character: "Ellie Williams",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "John Hannah",
      character: "Dr. Newman",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Anna Torv",
      character: "Tess Servopoulos",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Nick Offerman",
      character: "Bill",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Murray Bartlett",
      character: "Frank",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const seasons = [
    {
      number: 1,
      episodes: 9,
      year: "2023",
      description: "Joel and Ellie's journey across a post-apocalyptic America.",
    },
    {
      number: 2,
      episodes: 7,
      year: "2025",
      description: "The story continues five years later as Ellie seeks revenge.",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Cast Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            CAST
            <span className="text-sm font-normal text-muted-foreground">SEE ALL CAST & CREW →</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {cast.map((actor, index) => (
              <div key={index} className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3 overflow-hidden rounded-full">
                  <Image src={actor.image || "/placeholder.svg"} alt={actor.name} fill className="object-cover" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">{actor.name}</h4>
                <p className="text-xs text-muted-foreground">{actor.character}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Official Trailer */}
      <Card>
        <CardHeader>
          <CardTitle>Official Trailer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-hover transition-colors">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Synopsis */}
      <Card>
        <CardHeader>
          <CardTitle>Synopsis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            The Last of Us is a post-apocalyptic drama series set two decades after a global catastrophe. It follows
            Joel, a seasoned survivor, who is tasked with escorting Ellie, a teenage girl, across a desolated United
            States, transforming into a harrowing journey of survival and companionship. Based on the critically
            acclaimed video game series, the show explores themes of loss, hope, and the lengths people will go to
            protect those they love.
          </p>
        </CardContent>
      </Card>

      {/* Seasons */}
      <Card>
        <CardHeader>
          <CardTitle>Seasons (2)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seasons.map((season, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-foreground">Season {season.number}</h4>
                  <p className="text-sm text-muted-foreground">{season.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{season.episodes} episodes</div>
                  <div className="text-xs text-muted-foreground">{season.year}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
