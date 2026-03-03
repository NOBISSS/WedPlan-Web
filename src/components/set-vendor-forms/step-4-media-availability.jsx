/* eslint-disable no-unused-vars */
import React from "react"

import { useRef } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Upload,
  X,
  ImageIcon,
  Clock,
  CalendarDays,
  Plus,
} from "lucide-react"

// interface TimeSlot {
//   day: string
//   isOpen: boolean
//   openTime: string
//   closeTime: string
// }

// interface MediaAvailabilityData {
//   portfolioImages: File[]
//   portfolioPreviews: string[]
//   availableDates: string[]
//   weeklyTimings: TimeSlot[]
//   cancellationPolicy: string
//   restrictions: string
//   isAvailable: boolean
// }

// interface Step4MediaAvailabilityProps {
//   data: MediaAvailabilityData
//   onChange: (data: MediaAvailabilityData) => void
//   errors: Record<string, string>
// }

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export function Step4MediaAvailability({
  data,
  onChange,
  errors,
}) {
  const portfolioInputRef = useRef(null)

  const handlePortfolioImagesChange = (
    e
  ) => {
    const files = Array.from(e.target.files || [])
    const newImages = [...data.portfolioImages, ...files]

    const newPreviews = []
    let loadedCount = 0

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result)
        loadedCount++

        if (loadedCount === files.length) {
          onChange({
            ...data,
            portfolioImages: newImages,
            portfolioPreviews: [...data.portfolioPreviews, ...newPreviews],
          })
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removePortfolioImage = (index) => {
    onChange({
      ...data,
      portfolioImages: data.portfolioImages.filter((_, i) => i !== index),
      portfolioPreviews: data.portfolioPreviews.filter((_, i) => i !== index),
    })
  }

  const addAvailableDate = (date) => {
    if (date && !data.availableDates.includes(date)) {
      onChange({
        ...data,
        availableDates: [...data.availableDates, date].sort(),
      })
    }
  }

  const removeAvailableDate = (date) => {
    onChange({
      ...data,
      availableDates: data.availableDates.filter((d) => d !== date),
    })
  }

  const updateTimeSlot = (
    day,
    field,
    value
  ) => {
    onChange({
      ...data,
      weeklyTimings: data.weeklyTimings.map((slot) =>
        slot.day === day ? { ...slot, [field]: value } : slot
      ),
    })
  }

  const handleChange = (
    field,
    value
  ) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ImageIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Media, Availability & Operations</CardTitle>
            <CardDescription>
              Upload portfolio images and set your availability
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Portfolio Images */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Portfolio Images</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Showcase your best work (max 10 images)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => portfolioInputRef.current?.click()}
              disabled={data.portfolioPreviews.length >= 10}
              className="gap-1 bg-transparent"
            >
              <Plus className="h-4 w-4" />
              Add Images
            </Button>
          </div>

          <input
            ref={portfolioInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePortfolioImagesChange}
          />

          {data.portfolioPreviews.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.portfolioPreviews.map((preview, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removePortfolioImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {data.portfolioPreviews.length < 10 && (
                <div
                  className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
                  onClick={() => portfolioInputRef.current?.click()}
                >
                  <div className="text-center">
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mt-1">Add more</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
              onClick={() => portfolioInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">
                Click to upload portfolio images
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 5MB each
              </p>
            </div>
          )}
        </div>

        {/* Available Dates */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <Label>Available Dates</Label>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Input
              type="date"
              className="w-auto"
              onChange={(e) => {
                if (e.target.value) {
                  addAvailableDate(e.target.value)
                  e.target.value = ""
                }
              }}
            />
            {data.availableDates.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.availableDates.map((date) => (
                  <span
                    key={date}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                  >
                    {new Date(date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    <button
                      type="button"
                      onClick={() => removeAvailableDate(date)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Select specific dates when you are available for bookings
          </p>
        </div>

        {/* Weekly Availability */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label>Weekly Availability</Label>
          </div>
          <div className="space-y-3">
            {data.weeklyTimings.map((slot) => (
              <div
                key={slot.day}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border bg-muted/20"
              >
                <div className="flex items-center gap-3 sm:w-36">
                  <Switch
                    checked={slot.isOpen}
                    onCheckedChange={(checked) =>
                      updateTimeSlot(slot.day, "isOpen", checked)
                    }
                  />
                  <span
                    className={`text-sm font-medium ${
                      slot.isOpen ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {slot.day}
                  </span>
                </div>
                {slot.isOpen && (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={slot.openTime}
                      onChange={(e) =>
                        updateTimeSlot(slot.day, "openTime", e.target.value)
                      }
                      className="w-auto"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={slot.closeTime}
                      onChange={(e) =>
                        updateTimeSlot(slot.day, "closeTime", e.target.value)
                      }
                      className="w-auto"
                    />
                  </div>
                )}
                {!slot.isOpen && (
                  <span className="text-sm text-muted-foreground">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Policies */}
        <div className="border-t pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
            <Textarea
              id="cancellationPolicy"
              placeholder="Describe your cancellation and refund policy..."
              value={data.cancellationPolicy}
              onChange={(e) =>
                handleChange("cancellationPolicy", e.target.value)
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="restrictions">Service Restrictions / Notes</Label>
            <Textarea
              id="restrictions"
              placeholder="Any restrictions, travel limitations, or special requirements..."
              value={data.restrictions}
              onChange={(e) => handleChange("restrictions", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="isAvailable" className="text-sm font-medium">
                Currently Available
              </Label>
              <p className="text-xs text-muted-foreground">
                Turn off if you are not accepting new bookings
              </p>
            </div>
            <Switch
              id="isAvailable"
              checked={data.isAvailable}
              onCheckedChange={(checked) =>
                handleChange("isAvailable", checked)
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
