import Link from "next/link"
import { Hash, Tag as TagIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  createdAt: string
  updatedAt: string
}

interface PopularSearchesProps {
  tags: Tag[]
}

export function PopularSearches({ tags }: PopularSearchesProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  const popularTags = tags.slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TagIcon className="h-5 w-5 text-brand-primary" />
          Popular Tags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {popularTags.map((tag, index) => (
          <Link key={tag.id} href={`/tag/${tag.slug}`}>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center flex-shrink-0">
                  <Hash className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">
                    {tag.name}
                  </h4>
                  {tag.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {tag.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-sm text-muted-foreground flex-shrink-0">
                #{index + 1}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

