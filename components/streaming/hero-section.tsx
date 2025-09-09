import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function StreamingGuideHero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Best on Streaming</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover the best movies and TV shows across all streaming platforms
        </p>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input type="text" placeholder="Search movies and shows..." className="pl-10 pr-4 py-3 text-black" />
          <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-brand-primary hover:bg-brand-hover">
            Search
          </Button>
        </div>
      </div>
    </section>
  )
}
