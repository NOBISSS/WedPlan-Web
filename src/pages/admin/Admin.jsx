

import { Suspense, useState } from "react"

import { Users, MapPin, IndianRupee, Heart, Search, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const users = [
  { id: 1, name: "Rahul & Priya", email: "rahul@example.com", phone: "9876543210", events: 2, status: "Active" },
  { id: 2, name: "Amit & Sneha", email: "amit@example.com", phone: "9876543211", events: 1, status: "Active" },
  { id: 3, name: "Vikram & Anjali", email: "vikram@example.com", phone: "9876543212", events: 3, status: "Pending" },
  { id: 4, name: "Karan & Neha", email: "karan@example.com", phone: "9876543213", events: 1, status: "Active" },
  { id: 5, name: "Rohan & Meera", email: "rohan@example.com", phone: "9876543214", events: 2, status: "Completed" },
]

const venues = [
  { id: 1, name: "Grand Palace Hall", location: "Downtown City", pricePerDay: 50000, bookings: 12 },
  { id: 2, name: "Royal Gardens", location: "Green Valley", pricePerDay: 35000, bookings: 8 },
  { id: 3, name: "Sunset Beach Resort", location: "Coastal Area", pricePerDay: 75000, bookings: 15 },
  { id: 4, name: "Heritage Manor", location: "Old Town", pricePerDay: 45000, bookings: 6 },
  { id: 5, name: "Skyline Banquet", location: "City Center", pricePerDay: 60000, bookings: 10 },
]

const payments = [
  { id: 1, user: "Rahul & Priya", amount: 150000, date: "2025-01-15", status: "Completed", method: "UPI" },
  { id: 2, user: "Amit & Sneha", amount: 75000, date: "2025-01-14", status: "Pending", method: "Card" },
  { id: 3, user: "Vikram & Anjali", amount: 225000, date: "2025-01-13", status: "Completed", method: "Bank Transfer" },
  { id: 4, user: "Karan & Neha", amount: 50000, date: "2025-01-12", status: "Failed", method: "UPI" },
  { id: 5, user: "Rohan & Meera", amount: 180000, date: "2025-01-11", status: "Completed", method: "Card" },
]

function AdminContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    { label: "Total Users", value: "156", icon: Users, color: "bg-blue-500" },
    { label: "Active Venues", value: "12", icon: MapPin, color: "bg-emerald-500" },
    { label: "Total Revenue", value: "₹45L", icon: IndianRupee, color: "bg-amber-500" },
    { label: "Events Planned", value: "89", icon: Heart, color: "bg-pink-500" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg text-foreground">WedPlan Admin</span>
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage users, venues, and payments</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="venues">Venues</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>All Users</CardTitle>
                      <CardDescription>Manage registered users and their events</CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Couple</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">
                            Phone
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Events</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-border last:border-0">
                            <td className="py-3 px-4 text-foreground font-medium">{user.name}</td>
                            <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{user.email}</td>
                            <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{user.phone}</td>
                            <td className="py-3 px-4 text-foreground">{user.events}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : user.status === "Pending"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">Showing 1-5 of 156 users</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Venues Tab */}
            <TabsContent value="venues" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Venues</CardTitle>
                  <CardDescription>Manage venue listings and availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Venue</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">
                            Location
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price/Day</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Bookings</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {venues.map((venue) => (
                          <tr key={venue.id} className="border-b border-border last:border-0">
                            <td className="py-3 px-4 text-foreground font-medium">{venue.name}</td>
                            <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{venue.location}</td>
                            <td className="py-3 px-4 text-foreground">₹{venue.pricePerDay.toLocaleString()}</td>
                            <td className="py-3 px-4 text-foreground">{venue.bookings}</td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Track all payments and transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">
                            Method
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.id} className="border-b border-border last:border-0">
                            <td className="py-3 px-4 text-foreground font-medium">{payment.user}</td>
                            <td className="py-3 px-4 text-foreground">₹{payment.amount.toLocaleString()}</td>
                            <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{payment.date}</td>
                            <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{payment.method}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  payment.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : payment.status === "Pending"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminContent />
    </Suspense>
  )
}
