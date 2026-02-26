;


import { Calendar, MapPin, Users, Mail, Store, ImageIcon, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Link } from "react-router-dom"

const dashboardCards = [
  {
    icon: Calendar,
    title: "View Events",
    description: "Manage your wedding events",
    href: "/dashboard/events",
    color: "bg-blue-500",
  },
  {
    icon: MapPin,
    title: "Choose Venue",
    description: "Browse and select venues",
    href: "/dashboard/venue",
    color: "bg-emerald-500",
  },
  {
    icon: Users,
    title: "Guest List",
    description: "Manage your guest list",
    href: "/dashboard/guests",
    color: "bg-orange-500",
  },
  {
    icon: Mail,
    title: "Invitations",
    description: "Send digital invitations",
    href: "/dashboard/invitations",
    color: "bg-pink-500",
  },
  {
    icon: Store,
    title: "Vendors",
    description: "Find and book vendors",
    href: "/dashboard/vendors",
    color: "bg-indigo-500",
  },
  {
    icon: ImageIcon,
    title: "Post Wedding",
    description: "Upload and share photos",
    href: "/dashboard/post-wedding",
    color: "bg-cyan-500",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description: "Rate your vendors",
    href: "/dashboard/reviews",
    color: "bg-amber-500",
  },
]

export default function DashboardPage() {
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground mt-1">Manage your wedding planning from one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Days Left</p>
              <p className="text-2xl font-bold text-foreground">45</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Guests</p>
              <p className="text-2xl font-bold text-foreground">150</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Vendors</p>
              <p className="text-2xl font-bold text-foreground">8</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Tasks Done</p>
              <p className="text-2xl font-bold text-foreground">12/20</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {dashboardCards.map((card, index) => (
              <Link key={index} to={card.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-5">
                    <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                      {card.title}
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Added 5 guests to the list", time: "2 hours ago" },
                { action: "Booked Grand Palace venue", time: "1 day ago" },
                { action: "Confirmed photographer", time: "2 days ago" },
                { action: "Sent 50 invitations", time: "3 days ago" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-foreground">{activity.action}</span>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
