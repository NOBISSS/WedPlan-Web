import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  Calendar, MapPin, Users, Store, ArrowLeft, Clock,
  CheckCircle2, XCircle, AlertCircle, Wallet, Tag,
  CalendarDays, Globe, Layers
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_MAP = {
  planning:  { label: "Planning",  icon: AlertCircle,  cls: "bg-blue-50 text-blue-600 border-blue-200" },
  confirmed: { label: "Confirmed", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  completed: { label: "Completed", icon: CheckCircle2, cls: "bg-gray-100 text-gray-500 border-gray-200" },
  cancelled: { label: "Cancelled", icon: XCircle,      cls: "bg-red-50 text-red-500 border-red-200" },
}

const fmt = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "—"

const fmtBudget = (val) =>
  val != null
    ? `₹${Number(val).toLocaleString("en-IN")}`
    : "—"

const daysBetween = (start, end) => {
  if (!start || !end) return null
  const diff = new Date(end) - new Date(start)
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, iconCls, borderCls }) {
  return (
    <Card className={`border ${borderCls} hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${iconCls}`}>
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs font-medium text-foreground mt-0.5">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </CardContent>
    </Card>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function EventDetailPage() {
  const { id } = useParams();
  const { events, loading } = useSelector((state) => state.event)
  console.log("EVENT DETAIL PAGE ID ",id,events);
    

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Clock className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const event = events.find((e) => e._id === id)
  console.log(event);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <XCircle className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Event not found.</p>
        <Link to="/dashboard" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
        </Link>
      </div>
    )
  }

  const status = STATUS_MAP[event.status] ?? STATUS_MAP.planning
  const StatusIcon = status.icon
  const duration = daysBetween(event.startDate, event.endDate)
  const spentPct = event.totalBudget
    ? Math.min(100, Math.round(((event.spentBudget ?? 0) / Number(event.totalBudget)) * 100))
    : 0

  return (
    <div className="space-y-6">

      {/* ── Back link ── */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 p-6 md:p-8 text-white">
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -right-4 w-32 h-32 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            {/* type badge */}
            {event.type?.title && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 rounded-full text-xs font-medium mb-3">
                <Tag className="h-3 w-3" />
                {event.type.title}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {event.title || event.name || "Untitled Event"}
            </h1>
            <p className="text-blue-100 text-sm md:text-base max-w-xl leading-relaxed">
              {event.description}
            </p>
            {/* dates row */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-blue-100">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {fmt(event.startDate)} → {fmt(event.endDate)}
              </span>
              {duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {duration} day{duration > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {/* Status pill */}
          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
              <StatusIcon className="h-4 w-4" />
              <div>
                <p className="text-xs text-blue-100">Status</p>
                <p className="font-semibold text-sm">{status.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Guests"
          value={event.guestCount ?? 0}
          sub={`${event.confirmedGuests ?? 0} confirmed`}
          iconCls="bg-emerald-50 text-emerald-600"
          borderCls="border-emerald-100"
        />
        <StatCard
          icon={CheckCircle2}
          label="Confirmed"
          value={event.confirmedGuests ?? 0}
          sub={event.guestCount ? `of ${event.guestCount} invited` : "No guests yet"}
          iconCls="bg-blue-50 text-blue-600"
          borderCls="border-blue-100"
        />
        <StatCard
          icon={Store}
          label="Vendors"
          value={event.vendorCount ?? 0}
          sub="Booked vendors"
          iconCls="bg-indigo-50 text-indigo-600"
          borderCls="border-indigo-100"
        />
        <StatCard
          icon={Layers}
          label="Sub-events"
          value={event.subEvents?.length ?? 0}
          sub="Ceremonies / functions"
          iconCls="bg-amber-50 text-amberald-600"
          borderCls="border-amber-100"
        />
      </div>

      {/* ── Details + Budget row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Event Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600" />
              Event Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Event Name",  value: event.title || event.name },
              { label: "Type",        value: event.type?.title ?? "—" },
              { label: "Start Date",  value: fmt(event.startDate) },
              { label: "End Date",    value: fmt(event.endDate) },
              { label: "Duration",    value: duration ? `${duration} day${duration > 1 ? "s" : ""}` : "—" },
              { label: "Status",      value: status.label },
              { label: "Active",      value: event.isActive ? "Yes" : "No" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm font-medium text-foreground">{value ?? "—"}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Budget */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Wallet className="h-4 w-4 text-blue-600" />
              Budget Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total Budget</span>
              <span className="text-lg font-bold text-foreground">{fmtBudget(event.totalBudget)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Spent</span>
              <span className="text-sm font-medium text-foreground">{fmtBudget(event.spentBudget ?? 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Remaining</span>
              <span className="text-sm font-medium text-emerald-600">
                {fmtBudget(Number(event.totalBudget ?? 0) - Number(event.spentBudget ?? 0))}
              </span>
            </div>
            {/* budget bar */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Spent so far</span>
                <span>{spentPct}%</span>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${spentPct > 80 ? "bg-red-500" : "bg-blue-500"}`}
                  style={{ width: `${spentPct}%` }}
                />
              </div>
            </div>

            {/* Venue */}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-muted-foreground">Venue</span>
              </div>
              {event.venue ? (
                <div className="mt-1">
                  <p className="text-sm font-medium text-foreground">{event.venue.name}</p>
                  {event.venue.location && (
                    <p className="text-xs text-muted-foreground">{event.venue.location}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1 italic">No venue booked yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Sub-events ── */}
      {event.subEvents?.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-600" />
              Sub-Events
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {event.subEvents.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.subEvents.map((sub) => (
                <div
                  key={sub._id}
                  className="border border-border rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{sub.name}</h3>
                    {sub.isActive && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-xs">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{sub.description}</p>
                  <div className="space-y-1.5">
                    {sub.date && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {fmt(sub.date)}
                        {sub.startTime && sub.endTime && ` · ${sub.startTime} – ${sub.endTime}`}
                      </div>
                    )}
                    {sub.location && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {sub.location}{sub.city ? `, ${sub.city}` : ""}
                      </div>
                    )}
                    {sub.numberOfDays && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {sub.numberOfDays} day{sub.numberOfDays > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}