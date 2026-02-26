
import { Heart, Calendar, MapPin, Users, Store, ImageIcon, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Link } from "react-router-dom"

const features = [
  {
    icon: Calendar,
    title: "Event Planning",
    description: "Organize every detail of your wedding from start to finish",
  },
  {
    icon: MapPin,
    title: "Venue Selection",
    description: "Browse and book the perfect venue for your special day",
  },
  {
    icon: Users,
    title: "Guest Management",
    description: "Manage your guest list, RSVPs, and seating arrangements",
  },
  {
    icon: Store,
    title: "Vendor Network",
    description: "Connect with trusted vendors for all your wedding needs",
  },
  {
    icon: ImageIcon,
    title: "Photo Gallery",
    description: "Store and share your precious wedding memories",
  },
]

const steps = [
  "Create your account",
  "Select your event type",
  "Choose your venue",
  "Manage your guest list",
  "Book your vendors",
  "Send invitations",
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Smart Wedding Event Management Platform
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              Plan your perfect wedding with ease. From venue selection to guest management, we handle everything so you
              can focus on your special day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                <Link to="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to plan and execute your dream wedding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Simple steps to plan your perfect wedding</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-foreground font-medium">{step}</span>
                  <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Plan Your Dream Wedding?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of happy couples who planned their perfect day with us
          </p>
          <Button asChild size="lg" variant="secondary" className="text-base">
            <Link to="/register">Start Planning Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">WedPlan</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Smart Wedding Event Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
