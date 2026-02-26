

import { useState } from "react"
import { Star, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { DashboardLayout } from "@/components/DashboardLayout"

const vendors = [
  { id: 1, name: "Grand Palace Hall", type: "Venue", rating: 0, review: "" },
  { id: 2, name: "Bloom Decorations", type: "Decorator", rating: 0, review: "" },
  { id: 3, name: "Capture Moments Studio", type: "Photographer", rating: 0, review: "" },
  { id: 4, name: "Royal Feast Caterers", type: "Caterer", rating: 0, review: "" },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(vendors)

  const handleRatingChange = (vendorId, rating) => {
    setReviews(reviews.map((v) => (v.id === vendorId ? { ...v, rating } : v)))
  }

  const handleReviewChange = (vendorId, review) => {
    setReviews(reviews.map((v) => (v.id === vendorId ? { ...v, review } : v)))
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Reviews & Ratings</h1>
          <p className="text-muted-foreground mt-1">Rate and review your wedding vendors</p>
        </div>

        <div className="grid gap-4">
          {reviews.map((vendor) => (
            <Card key={vendor.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <CardDescription>{vendor.type}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(vendor.id, star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            star <= vendor.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <Textarea
                      placeholder="Write your review..."
                      value={vendor.review}
                      onChange={(e) => handleReviewChange(vendor.id, e.target.value)}
                      rows={3}
                      className="flex-1"
                    />
                  </div>
                  <Button size="sm" disabled={vendor.rating === 0}>
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  )
}
