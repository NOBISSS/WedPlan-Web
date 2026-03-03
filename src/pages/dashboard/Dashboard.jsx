import {
  Calendar, MapPin, Users, Mail, Store, ImageIcon,
  Star, ArrowRight, Clock, CheckCircle2, TrendingUp, Heart
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import {  useSelector } from "react-redux"
import {  useState } from "react"

const dashboardCards = [
  { icon: Calendar, title: "View Events", description: "Manage your wedding events", href: "/dashboard/events", color: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600" },
  { icon: MapPin, title: "Choose Venue", description: "Browse and select venues", href: "/dashboard/venue", color: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600" },
  { icon: Users, title: "Guest List", description: "Manage your guest list", href: "/dashboard/guests", color: "bg-orange-500", light: "bg-orange-50", text: "text-orange-600" },
  { icon: Mail, title: "Invitations", description: "Send digital invitations", href: "/dashboard/invitations", color: "bg-pink-500", light: "bg-pink-50", text: "text-pink-600" },
  { icon: Store, title: "Vendors", description: "Find and book vendors", href: "/dashboard/vendors", color: "bg-indigo-500", light: "bg-indigo-50", text: "text-indigo-600" },
  { icon: ImageIcon, title: "Post Wedding", description: "Upload and share photos", href: "/dashboard/post-wedding", color: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-600" },
  { icon: Star, title: "Reviews & Ratings", description: "Rate your vendors", href: "/dashboard/reviews", color: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600" },
]

const stats = [
  { label: "Days Left", value: "45", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", trend: "Until your big day" },
  { label: "Guests", value: "150", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", trend: "+12 this week" },
  { label: "Vendors", value: "8", icon: Store, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", trend: "3 pending confirm" },
  { label: "Tasks Done", value: "12/20", icon: CheckCircle2, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", trend: "60% complete" },
]

const EVENT_ICONS = {
  Wedding: "💍",
  reception: "🥂",
  engagement: "💌",
  mehndi: "🌿",
  sangeet: "🎶",
}

const activities = [
  { action: "Added 5 guests to the list", time: "2 hours ago", icon: Users, color: "bg-emerald-100 text-emerald-600" },
  { action: "Booked Grand Palace venue", time: "1 day ago", icon: MapPin, color: "bg-blue-100 text-blue-600" },
  { action: "Confirmed photographer", time: "2 days ago", icon: Star, color: "bg-amber-100 text-amber-600" },
  { action: "Sent 50 invitations", time: "3 days ago", icon: Mail, color: "bg-pink-100 text-pink-600" },
]

export default function DashboardPage() {
  const {events,loading} = useSelector((state) => state.event);
  const [selectedEvent, setSelectedEvent] = useState(events.length > 0 ? events[0]._id : null);  
  return (
    <div className="space-y-8">

      {/* ── Hero Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-blue-500 to-blue-400 p-6 md:p-8 text-white">
        {/* decorative circles */}
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -right-4 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute top-4 right-32 w-12 h-12 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-blue-200" />
              <span className="text-blue-100 text-sm font-medium tracking-wide">Wedding Planner</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome Back! 👋</h1>
            <p className="text-blue-100 text-sm md:text-base">
              Your big day is <span className="font-semibold text-white">45 days away.</span> Keep up the great work!
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
              <p className="text-3xl font-bold">60%</p>
              <p className="text-xs text-blue-100 mt-0.5">Planning Done</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mt-5">
          <div className="flex justify-between text-xs text-blue-100 mb-1.5">
            <span>Overall Progress</span>
            <span>12 / 20 tasks</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-white rounded-full" />
          </div>
        </div>
      </div>
      { loading ? (<div className="flex items-center justify-center h-32"><Clock className="h-6 w-6 animate-spin text-blue-600" /></div>) :  (<div className="p-4">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-bold text-foreground">Events</h1>
        <div className="flex">
        {events.map((event) => (
          <div key={event._id} className={`${selectedEvent === event._id ? "text-white bg-blue-500 border-blue-300" : "bg-white border-blue-100"} flex items-center gap-1.5 px-3 py-1.5 border rounded-lg cursor-pointer transition-colors duration-75`} onClick={() => setSelectedEvent(event._id)}>
            <span className="text-sm">{EVENT_ICONS[event.title] ?? "🎉"}</span>
            <span className="text-sm font-medium">{event?.title || "Wedding Celebration"}</span>
          </div>
        ))}
        </div>
      </div>
      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
        {stats.map((stat, i) => (
          <Card key={i} className={`border ${stat.border} hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground/50" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs font-medium text-foreground mt-0.5">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Quick Actions + Activity side by side on large screens ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

        {/* Quick Actions — takes 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            <span className="text-xs text-muted-foreground">{dashboardCards.length} sections</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dashboardCards.map((card, index) => (
              <Link key={index} to={card.href}>
                <Card className="h-full hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-11 h-11 ${card.light} ${card.text} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm leading-tight">{card.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{card.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity — takes 1/3 width */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View all</span>
          </div>
          <Card className="h-fit">
            <CardContent className="p-4 space-y-1">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
                  <div className={`w-7 h-7 rounded-lg ${activity.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <activity.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Mini upcoming reminder */}
          <Card className="border-blue-100 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-foreground">Next Up</span>
              </div>
              <p className="text-sm text-foreground font-semibold">Venue Site Visit</p>
              <p className="text-xs text-muted-foreground mt-0.5">Tomorrow, 11:00 AM</p>
              <div className="mt-3 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-blue-500 rounded-full" />
              </div>
              <p className="text-xs text-blue-600 mt-1 font-medium">3 of 4 prep tasks done</p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>)}
    </div>
  )
}