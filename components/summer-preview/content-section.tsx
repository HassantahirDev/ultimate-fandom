import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function SummerPreviewContent() {
  const upcomingMovies = [
    {
      title: "Superman",
      releaseDate: "July 11, 2025",
      description: "James Gunn's highly anticipated reboot of the Man of Steel franchise starring David Corenswet.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Karate Kid: Legends",
      releaseDate: "May 30, 2025",
      description: "The next chapter in the Karate Kid saga bringing together multiple generations.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "How to Train Your Dragon",
      releaseDate: "June 13, 2025",
      description: "The beloved animated franchise gets the live-action treatment.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "28 Years Later",
      releaseDate: "June 20, 2025",
      description: "The long-awaited sequel to the zombie horror franchise.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <article className="prose prose-lg max-w-none">
      <div className="mb-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          2025's summer movie season is finally heating up, and ScreenRant is proud to present exclusive looks at 39 new
          and upcoming movies from May through August. There have been some ups and downs in{" "}
          <span className="text-foreground font-medium">2024</span> so far, with movies such as Ryan Coogler's{" "}
          <em>Sinners</em> and the video game adaptation <em>A Minecraft Movie</em> rocketing up the charts, zooming
          past other titles that have fizzled out at the box office. However, as the year progresses, more and more
          intriguing titles are set to come to both theaters and streaming.
        </p>

        <p className="text-lg text-muted-foreground leading-relaxed">
          ScreenRant's 2025 Summer Movie Preview looks forward at a wide variety of titles set to debut in the coming
          months, including blockbusters such as <em>Superman</em>, <em>Karate Kid: Legends</em>, and{" "}
          <em>How to Train Your Dragon</em>, smaller-scale dramas like Darren Aronofsky's <em>Caught Stealing</em>, and
          a number of other exciting releases including <em>Final Destination</em>.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-6">Most Anticipated Summer 2025 Movies</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {upcomingMovies.map((movie, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{movie.title}</h3>
              <p className="text-sm text-brand-primary font-medium mb-3">{movie.releaseDate}</p>
              <p className="text-muted-foreground">{movie.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-6">What to Expect This Summer</h2>

      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        The summer of 2025 promises to be one of the most exciting in recent memory, with a diverse slate of films
        spanning every genre imaginable. From superhero spectacles to intimate character studies, there's something for
        every moviegoer to enjoy.
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        James Gunn's <em>Superman</em> stands as perhaps the most anticipated release of the season, marking the
        beginning of the new DC Universe. With David Corenswet taking on the iconic role, expectations are sky-high for
        this fresh take on the Man of Steel.
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Meanwhile, legacy franchises like <em>Karate Kid</em> and <em>How to Train Your Dragon</em> are getting new life
        breathed into them, while horror fans can look forward to the return of the <em>28 Days Later</em> universe with{" "}
        <em>28 Years Later</em>.
      </p>
    </article>
  )
}
