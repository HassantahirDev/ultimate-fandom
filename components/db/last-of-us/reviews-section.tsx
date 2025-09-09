import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, User } from "lucide-react"

export function LastOfUsReviews() {
  const reviews = [
    {
      author: "Zachary",
      rating: 9,
      text: "As someone who played the video game, they did a great job adapting it. Was skeptical of Pascal's casting originally but he did well in the role.",
    },
    {
      author: "Sarah",
      rating: 8,
      text: "Incredible performances from Pedro Pascal and Bella Ramsey. The show captures the emotional depth of the source material perfectly.",
    },
    {
      author: "Mike",
      rating: 10,
      text: "Best video game adaptation ever made. The production values are through the roof and the storytelling is phenomenal.",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>REVIEWS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{review.author}</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{review.rating}/10</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">★ Rate Now</Button>
            <Button variant="outline" className="w-full text-sm">
              See All Reviews →
            </Button>
            <Button variant="link" className="w-full text-sm text-muted-foreground">
              Leave a Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
