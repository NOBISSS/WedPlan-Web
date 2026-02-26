

import { useState } from "react"

import { Heart, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Link } from "react-router-dom"

const eventTypes = [
  {
    id: "wedding",
    title: "Wedding Ceremony",
    description: "Traditional wedding ceremony with all rituals",
    selected: true,
  },
  {
    id: "reception",
    title: "Wedding Reception",
    description: "Grand reception party for all guests",
    selected: false,
  },
  {
    id: "engagement",
    title: "Engagement Party",
    description: "Intimate engagement celebration",
    selected: false,
  },
  {
    id: "mehndi",
    title: "Mehndi Ceremony",
    description: "Traditional henna ceremony",
    selected: false,
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    description: "Musical evening with dance performances",
    selected: false,
  },
]

export default function EventsPage() {
  const [selectedEvents, setSelectedEvents] = useState(["wedding"])

  const toggleEvent = (eventId) => {
    setSelectedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]))
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Select Events</h1>
          <p className="text-muted-foreground mt-1">Choose the events you want to plan for your wedding</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventTypes.map((event) => {
            const isSelected = selectedEvents.includes(event.id)
            return (
              <Card
                key={event.id}
                className={`cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-primary border-primary" : "hover:shadow-md"
                }`}
                onClick={() => toggleEvent(event.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "bg-primary border-primary" : "border-muted-foreground"
                      }`}
                    >
                      {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mt-4 mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Selected Events Summary</CardTitle>
            <CardDescription>You have selected {selectedEvents.length} event(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedEvents.map((eventId) => {
                const event = eventTypes.find((e) => e.id === eventId)
                return (
                  <span key={eventId} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {event?.title}
                  </span>
                )
              })}
            </div>
            <Button asChild>
              <Link to="/dashboard/venue">
                Continue to Venue Selection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    
  )
}
