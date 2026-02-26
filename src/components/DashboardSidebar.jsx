import { Calendar, MapPin, Users, Mail, Store, ImageIcon, Star, LayoutDashboard, LogOut, Heart, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Events", href: "/dashboard/events" },
  { icon: MapPin, label: "Venue", href: "/dashboard/venue" },
  { icon: Users, label: "Guest List", href: "/dashboard/guests" },
  { icon: Mail, label: "Invitations", href: "/dashboard/invitations" },
  { icon: Store, label: "Vendors", href: "/dashboard/vendors" },
  { icon: ImageIcon, label: "Post Wedding", href: "/dashboard/post-wedding" },
  { icon: Star, label: "Reviews", href: "/dashboard/reviews" },
]

export function DashboardSidebar({ isOpen, onClose }) {
  const {pathname} = useLocation()

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg text-foreground">WedPlan</span>
            </Link>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-muted rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
