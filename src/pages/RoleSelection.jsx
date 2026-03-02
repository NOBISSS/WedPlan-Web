import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, Briefcase, ArrowRight, Check, Gem } from "lucide-react"
import { cn } from "@/lib/utils"

const roles = [
  {
    id: "user",
    title: "Event Organizer",
    description: "Plan and manage your wedding events, invite guests, and book services.",
    icon: Users,
    features: ["Create & manage events", "Guest list management", "Send WhatsApp invitations", "Book venues & vendors"],
    color: "bg-blue-50 text-blue-600 border-blue-200",
    activeColor: "border-accent bg-accent/5",
  },
  {
    id: "venue",
    title: "Venue Provider",
    description: "List your venue, manage bookings, and grow your business.",
    icon: MapPin,
    features: ["List your venue", "Manage availability", "Handle booking requests", "Track revenue"],
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    activeColor: "border-accent bg-accent/5",
  },
  {
    id: "vendor",
    title: "Service Vendor",
    description: "Offer your services, manage orders, and connect with clients.",
    icon: Briefcase,
    features: ["List your services", "Set custom pricing", "Manage bookings", "Track earnings"],
    color: "bg-amber-50 text-amber-600 border-amber-200",
    activeColor: "border-accent bg-accent/5",
  },
]

export default function RoleSelectionPage() {
  // const { selectRole, user } = useAuth()
  // const navigate = useNavigate();
  const [selected, setSelected] = useState(null)

  // React.useEffect(() => {
  //   if (user?.role) {
  //     navigate(`/${user.role}/dashboard`)
  //   }
  // }, [user?.role, navigate])

  // const handleContinue = () => {
  //   if (selected) {
  //     selectRole(selected)
  //     navigate("/profile-setup")
  //   }
  // }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-5xl flex items-center gap-2 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Gem className="h-4 w-4" />
          </div>
          <span className="font-semibold">WedPlan</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-balance">Choose Your Role</h1>
            <p className="mt-2 text-muted-foreground">
              Select how you want to use WedPlan. You can always switch later.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role, i) => (
              <Card
                key={role.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md relative overflow-hidden",
                  selected === role.id
                    ? "border-2 border-accent shadow-md ring-1 ring-accent/20"
                    : "border hover:border-accent/40"
                )}
                onClick={() => setSelected(role.id)}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {selected === role.id && (
                  <div className="absolute top-3 right-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl mb-2", role.color)}>
                    <role.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-48"
              disabled={!selected}
              // onClick={handleContinue}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
