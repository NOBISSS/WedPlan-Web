import {  useState } from "react"
import { Heart, ArrowRight, Check, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import {  useSelector } from "react-redux"

const EVENT_ICONS = {
  Wedding: "💍",
  reception: "🥂",
  engagement: "💌",
  mehndi: "🌿",
  sangeet: "🎶",
}

export default function EventsPage() {

  const [selectedEvents, setSelectedEvents] = useState([]);
  const {categories,loading}=useSelector((state) => state.eventCategory);

  const toggleEvent = (eventId) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    )
  }

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex justify-between">
        <div className="">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Select Events</h1>
        <p className="text-muted-foreground mt-1">Choose the events you want to plan for your wedding</p>
        </div>
        <div className="">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
           + Create Event
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-6">

          {/* ── API Events Strip (from backend) ── */}

          {/* ── Selectable Event Cards ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <h2 className="text-lg font-semibold text-foreground">Plan Your Events</h2>
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {selectedEvents?.length || 0} selected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories && categories.map((event) => {
                const isSelected = selectedEvents && selectedEvents?.includes(event._id)
                return (
                  <Card
                    key={event._id}
                    className={`cursor-pointer transition-all select-none ${
                      isSelected
                        ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50/40"
                        : "hover:shadow-md hover:border-blue-200"
                    }`}
                    onClick={() => toggleEvent(event._id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && toggleEvent(event._id)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                          {EVENT_ICONS[event.title ?? "Event"] ?? "🎉"}
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-blue-500 border-blue-500"
                              : "border-muted-foreground"
                          }`}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* ── Summary ── */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Events Summary</CardTitle>
              <CardDescription>You have selected {selectedEvents?.length || 0} event(s)</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedEvents.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedEvents.length>0 && selectedEvents.map((eventId) => {
                    const event = categories.find((e) => e._id === eventId)
                    return (
                      <span
                        key={eventId}
                        className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {EVENT_ICONS[event?.title] ?? "🎉"} {event?.title}
                      </span>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic mb-6">
                  No events selected yet — pick at least one above.
                </p>
              )}

              <Button asChild disabled={selectedEvents?.length === 0}>
                <Link to="/dashboard/venue">
                  Continue to Venue Selection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}