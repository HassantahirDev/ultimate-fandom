import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function CoverStoryContent() {
  return (
    <article className="prose prose-lg max-w-none">
      <div className="mb-8">
        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
          Ana de Armas steps into the spotlight like never before in <em>Ballerina</em>, the highly anticipated John
          Wick universe spinoff that promises to deliver the same high-octane action with a distinctly feminine touch.
        </p>
      </div>

      <div className="mb-8">
        <Image
          src="/placeholder.svg?height=400&width=600"
          alt="Ana de Armas training for Ballerina"
          width={600}
          height={400}
          className="rounded-lg"
        />
        <p className="text-sm text-muted-foreground mt-2 italic">
          Ana de Armas underwent extensive training to prepare for the physically demanding role.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-6">From Bond Girl to Assassin</h2>

      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        "I've always been drawn to characters who are more than they appear on the surface," de Armas tells us during
        our exclusive interview. "With Ballerina, I get to explore a character who uses grace and beauty as weapons,
        which is something I've never done before."
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        The film, directed by Len Wiseman, follows Eve Macarro (de Armas), a young woman who seeks revenge against the
        killers who murdered her family. Set in the same universe as the John Wick films, <em>Ballerina</em> promises to
        expand the mythology while introducing audiences to a new kind of assassin.
      </p>

      <Card className="my-8 bg-brand-muted dark:bg-brand-muted-dark border-brand-muted dark:border-brand-accent-dark">
        <CardContent className="p-6">
          <blockquote className="text-xl italic text-foreground">
            "The choreography in this film is unlike anything I've experienced. Every fight scene is like a deadly
            dance."
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-2 block">— Ana de Armas</cite>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold text-foreground mb-6">Training for the Role</h2>

      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        Preparing for <em>Ballerina</em> required de Armas to undergo months of intensive training. "I worked with
        ballet instructors, martial arts experts, and weapons specialists," she explains. "The goal was to make every
        movement look effortless while being incredibly precise and deadly."
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div>
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Ana de Armas ballet training"
            width={400}
            height={300}
            className="rounded-lg"
          />
          <p className="text-sm text-muted-foreground mt-2">Ballet training sessions</p>
        </div>
        <div>
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Ana de Armas weapons training"
            width={400}
            height={300}
            className="rounded-lg"
          />
          <p className="text-sm text-muted-foreground mt-2">Weapons and combat training</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-6">Expanding the John Wick Universe</h2>

      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        <em>Ballerina</em> represents a significant expansion of the John Wick universe, introducing new locations,
        characters, and mythology while maintaining the stylized action that fans have come to expect. "We wanted to
        honor what came before while creating something entirely new," says director Len Wiseman.
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed">
        The film is set to release in theaters June 6, 2025, and early reactions suggest that de Armas has delivered a
        performance that will redefine what it means to be an action star in the modern era.
      </p>
    </article>
  )
}
