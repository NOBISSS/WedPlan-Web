
import { Heart, Calendar, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Link } from "react-router-dom"

const eventTypes = [
  {
    id: "wedding",
    title: "Wedding",
    description: "Plan your dream wedding with all the essential tools",
    icon: Heart,
    features: ["Venue Selection", "Guest Management", "Vendor Booking", "Invitations"],
  },
  {
    id: "engagement",
    title: "Engagement",
    description: "Organize the perfect engagement ceremony",
    icon: Sparkles,
    features: ["Venue Booking", "Guest List", "Decoration", "Catering"],
    comingSoon: true,
  },
  {
    id: "reception",
    title: "Reception",
    description: "Plan an unforgettable wedding reception",
    icon: Calendar,
    features: ["Hall Booking", "Menu Planning", "Entertainment", "Photography"],
    comingSoon: true,
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Select Your Event</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the type of event you want to plan and let us help you make it perfect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {eventTypes.map((event) => (
            <Card
              key={event.id}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                event.comingSoon ? "opacity-75" : ""
              }`}
            >
              {event.comingSoon && (
                <div className="absolute top-4 right-4 bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-full">
                  Coming Soon
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <event.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {event.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full" disabled={event.comingSoon}>
                  <Link to={event.comingSoon ? "#" : "/dashboard"}>
                    Select Event
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
