import Image from "next/image"

interface TagPageHeroProps {
  title: string
  description: string
  backgroundImage: string
}

export function TagPageHero({ title, description, backgroundImage }: TagPageHeroProps) {
  return (
    <section className="relative h-64 overflow-hidden">
      <Image src={backgroundImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-200 max-w-2xl">{description}</p>
        </div>
      </div>
    </section>
  )
}
