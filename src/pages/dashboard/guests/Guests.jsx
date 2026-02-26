

import React from "react"
import { Suspense, useState } from "react"
import { Plus, Users, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/DashboardLayout"
import { GoogleOAuthProvider } from "@react-oauth/google"
import GoogleContactButton from "./GoogleContactsButton"



const initialGuests = [
  { id: 1, name: "Rahul Sharma", phone: "9876543210", category: "Family" },
  { id: 2, name: "Priya Patel", phone: "9876543211", category: "Friend" },
  { id: 3, name: "Amit Kumar", phone: "9876543212", category: "Relative" },
  { id: 4, name: "Sneha Gupta", phone: "9876543213", category: "Family" },
  { id: 5, name: "Vikram Singh", phone: "9876543214", category: "Friend" },
]

function GuestsContent() {
  const [guests, setGuests] = useState(initialGuests)
  const [searchTerm, setSearchTerm] = useState("")
  const [newGuest, setNewGuest] = useState({ name: "", phone: "", category: "Family" })
  const [showForm, setShowForm] = useState(false)

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm) ||
      guest.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddGuest = (e) => {
    e.preventDefault()
    if (newGuest.name && newGuest.phone) {
      setGuests([...guests, { ...newGuest, id: Date.now() }])
      setNewGuest({ name: "", phone: "", category: "Family" })
      setShowForm(false)
    }
  }

  const handleDeleteGuest = (id) => {
    setGuests(guests.filter((guest) => guest.id !== id))
  }

  const getCategoryCount = (category) => guests.filter((g) => g.category === category).length

  return (
    
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Guest List</h1>
            <p className="text-muted-foreground mt-1">Manage your wedding guests</p>
          </div>
          <div className="flex gap-10">
           <GoogleOAuthProvider  clientId="671836512515-qml9ur04oo8rfu9rvs257i4uf2bka2eb.apps.googleusercontent.com">
          <GoogleContactButton/>
        </GoogleOAuthProvider> 

          <Button onClick={() => setShowForm(!showForm)} className="bg-blue-900">
            <Plus className="h-4 w-4 mr-2" />
            Add Guest
          </Button>
        </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{guests.length}</p>
                  <p className="text-sm text-muted-foreground">Total Guests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{getCategoryCount("Family")}</p>
              <p className="text-sm text-muted-foreground">Family</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{getCategoryCount("Friend")}</p>
              <p className="text-sm text-muted-foreground">Friends</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{getCategoryCount("Relative")}</p>
              <p className="text-sm text-muted-foreground">Relatives</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Guest Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Guest</CardTitle>
              <CardDescription>Fill in the guest details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddGuest} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">Guest Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter guest name"
                      value={newGuest.name}
                      onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={newGuest.phone}
                      onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newGuest.category}
                      onValueChange={(value) => setNewGuest({ ...newGuest, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Relative">Relative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit">Add Guest</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Guest List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>All Guests</CardTitle>
                <CardDescription>View and manage your guest list</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search guests..."
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
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest) => (
                    <tr key={guest.id} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 text-foreground font-medium">{guest.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{guest.phone}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            guest.category === "Family"
                              ? "bg-blue-100 text-blue-700"
                              : guest.category === "Friend"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {guest.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteGuest(guest.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredGuests.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No guests found</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

export default function GuestsPage() {
  return (
    <Suspense fallback={null}>
      <GuestsContent />
    </Suspense>
  )
}
