"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface NewsletterPreference {
  id: string
  value: string
  title: string
  description: string
}

const newsletterPreferences: NewsletterPreference[] = [
  {
    id: "mailingList-125",
    value: "125",
    title: "New Releases & Recommendations",
    description: "See our latest recommendations, from hot new releases to streaming hidden gems."
  },
  {
    id: "mailingList-126",
    value: "126",
    title: "Events, Interviews, & Exclusives",
    description: "Follow ScreenRant around the world and watch our must-see interviews and reveals!"
  },
  {
    id: "mailingList-109",
    value: "109",
    title: "For Your Consideration",
    description: "SR critics discuss and decide who will take the lead and grab the gold this awards season."
  },
  {
    id: "mailingList-59",
    value: "59",
    title: "Reviews",
    description: "Get the inside scoop on the latest movies, TV shows, and more, including film festival coverage."
  },
  {
    id: "mailingList-56",
    value: "56",
    title: "Star Wars",
    description: "Explore a galaxy far, far away with us."
  },
  {
    id: "mailingList-57",
    value: "57",
    title: "Star Trek",
    description: "Boldly go with Screen Rant Star Trek – your warp-speed guide to all things Trekiverse!"
  },
  {
    id: "mailingList-54",
    value: "54",
    title: "Marvel Cinematic Universe",
    description: "Join the Marvel fandom - your gateway to the latest updates, theories, and deep dives."
  },
  {
    id: "mailingList-55",
    value: "55",
    title: "DC Universe",
    description: "Your ultimate source for exclusive updates, fan theories, and in-depth insights with the DCU."
  },
  {
    id: "mailingList-50",
    value: "50",
    title: "Video Games",
    description: "Gamers, level up your knowledge – your hub for gaming news, reviews, and insider insights."
  },
  {
    id: "mailingList-127",
    value: "127",
    title: "Nintendo",
    description: "Weekly Nintendo Switch, Switch 2, and Nintendo exclusive news!"
  },
  {
    id: "mailingList-128",
    value: "128",
    title: "PlayStation",
    description: "Get the lastest on PlayStation Plus, exclusives, PS5, PS5 Pro, and... PS6 news."
  },
  {
    id: "mailingList-129",
    value: "129",
    title: "Xbox",
    description: "Keep up to date with all things Xbox and Game Pass."
  },
  {
    id: "mailingList-51",
    value: "51",
    title: "Comic Books",
    description: "Immerse yourself in the colorful world of comics."
  },
  {
    id: "mailingList-52",
    value: "52",
    title: "Anime",
    description: "For fellow otaku, journey into the world of anime."
  },
  {
    id: "mailingList-130",
    value: "130",
    title: "Horror",
    description: "Join - if you dare - to learn of all things spooky and spine-chilling coming up in film, TV, and gaming!"
  },
  {
    id: "mailingList-140",
    value: "140",
    title: "Network TV",
    description: "Your inside scoop on Network TV's hottest procedurals, dramas, and more!"
  },
  {
    id: "mailingList-53",
    value: "53",
    title: "Reality TV",
    description: "Your VIP pass to all the tea, eliminations, and behind-the-scenes secrets."
  },
  {
    id: "mailingList-134",
    value: "134",
    title: "Box Office",
    description: "See which theatrical movies are winning the box office along with our forecasts!"
  },
  {
    id: "mailingList-58",
    value: "58",
    title: "Deals",
    description: "Find fantastic deals at Screen Rant Deals – the spot for exclusive discounts and offers."
  }
]

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isMainSubscribed, setIsMainSubscribed] = useState(true)
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreferences, setShowPreferences] = useState(true)
  const [error, setError] = useState('')

  const handleMainSubscriptionChange = (checked: boolean) => {
    setIsMainSubscribed(checked)
    setShowPreferences(checked)
    if (!checked) {
      setSelectedPreferences([])
    }
  }

  const handlePreferenceChange = (preferenceValue: string, checked: boolean) => {
    if (checked) {
      setSelectedPreferences(prev => [...prev, preferenceValue])
    } else {
      setSelectedPreferences(prev => prev.filter(p => p !== preferenceValue))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Handle form submission logic here
      console.log({
        email,
        mainSubscription: isMainSubscribed,
        preferences: selectedPreferences
      })
      
      // Show success message or redirect
      alert('Successfully subscribed to newsletter!')
    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Subscribe to our newsletters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main description */}
            <div className="text-center">
              <p className="text-muted-foreground">
                The best movie, TV, and gaming updates, straight to your inbox. We hand pick the hottest stories to provide you with the content you care about most - every single day!
              </p>
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={4000}
                className="w-full"
              />
            </div>

            {/* Main subscription */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg uppercase tracking-wide">
                  Newsletter Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="main-subscription"
                    checked={isMainSubscribed}
                    onCheckedChange={handleMainSubscriptionChange}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="main-subscription" className="text-sm leading-relaxed cursor-pointer">
                      Dive into the world of movies and TV shows with Screen Rant, your source for news, reviews, and exclusive content.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences section */}
            {showPreferences && (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg uppercase tracking-wide">
                    Preferences
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Make your experience uniquely yours by refining your preferences.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {newsletterPreferences.map((preference) => (
                      <div key={preference.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-background/50">
                        <Checkbox
                          id={preference.id}
                          checked={selectedPreferences.includes(preference.value)}
                          onCheckedChange={(checked) => 
                            handlePreferenceChange(preference.value, checked as boolean)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-1">
                          <Label 
                            htmlFor={preference.id} 
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {preference.title}
                          </Label>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {preference.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error message */}
            {error && (
              <div className="text-destructive text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={isSubmitting || !email}
                className="bg-brand-primary hover:bg-brand-hover text-white px-8 py-3 text-lg font-semibold"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>

            {/* Privacy notice */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our{' '}
                <Link href="/page/privacy-policy/" className="text-brand-primary hover:text-brand-hover underline">
                  Privacy Policy
                </Link>{' '}
                and may receive occasional deal communications; you can unsubscribe anytime.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 