import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function StreamingPlatforms() {
  const platforms = [
    {
      name: "Netflix",
      logo: "/placeholder.svg?height=60&width=120",
      color: "bg-brand-primary",
      href: "/streaming/netflix",
    },
    {
      name: "Disney+",
      logo: "/placeholder.svg?height=60&width=120",
      color: "bg-blue-600",
      href: "/streaming/disney-plus",
    },
    {
      name: "HBO Max",
      logo: "/placeholder.svg?height=60&width=120",
      color: "bg-purple-600",
      href: "/streaming/hbo-max",
    },
    {
      name: "Amazon Prime",
      logo: "/placeholder.svg?height=60&width=120",
      color: "bg-blue-500",
      href: "/streaming/amazon-prime",
    },
    {
      name: "Apple TV+",
      logo: "/placeholder.svg?height=60&width=120",
      color: "bg-gray-800",
      href: "/streaming/apple-tv",
    },
    {
      name: "Paramount+",
      logo: "/placeholder.svg?height=60&width=120",
      color: "bg-blue-700",
      href: "/streaming/paramount-plus",
    },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Platform</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {platforms.map((platform, index) => (
          <Link key={index} href={platform.href}>
            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 ${platform.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Image
                    src={platform.logo || "/placeholder.svg"}
                    alt={platform.name}
                    width={40}
                    height={20}
                    className="filter brightness-0 invert"
                  />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-brand-primary transition-colors">
                  {platform.name}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
