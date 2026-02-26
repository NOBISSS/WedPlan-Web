;
import { useState } from "react"
import { MapPin, Calendar, IndianRupee, Check, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardLayout } from "@/components/DashboardLayout"
import { VenueFilter } from "./VenueFilter"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const venues = [
  {
    id: 1,
    name: "Grand Palace Hall",
    location: "Downtown City",
    pricePerDay: 50000,
    capacity: 500,
    image: "/luxury-wedding-venue-grand-palace-hall.jpg",
  },
  {
    id: 2,
    name: "Royal Gardens",
    location: "Green Valley",
    pricePerDay: 35000,
    capacity: 300,
    image: "/beautiful-garden-wedding-venue-with-flowers.jpg",
  },
  {
    id: 3,
    name: "Sunset Beach Resort",
    location: "Coastal Area",
    pricePerDay: 75000,
    capacity: 200,
    image: "/beach-resort-wedding-venue-sunset.jpg",
  },
  {
    id: 4,
    name: "Heritage Manor",
    location: "Old Town",
    pricePerDay: 45000,
    capacity: 400,
    image: "/heritage-manor-wedding-venue-elegant.jpg",
  },
  {
    id: 5,
    name: "Skyline Banquet",
    location: "City Center",
    pricePerDay: 60000,
    capacity: 600,
    image: "/modern-banquet-hall-wedding-venue-skyline.jpg",
  },
  {
    id: 6,
    name: "Lakeside Pavilion",
    location: "Lake District",
    pricePerDay: 55000,
    capacity: 350,
    image: "/lakeside-wedding-venue-pavilion-romantic.jpg",
  },
]

export default function VenuePage() {
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const selectedVenueData = venues.find((v) => v.id === selectedVenue)
  const totalCost = selectedVenueData ? selectedVenueData.pricePerDay * numberOfDays : 0
  const navigate = useNavigate();
  return (
    
      <div className="space-y-6">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Select Venue</h1>
            <p className="text-muted-foreground mt-1">Choose the perfect venue for your special day</p>
          </div>
          <div className="mr-2 mt-2">
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Open All Filters
            </button>
            <VenueFilter
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onApply={(filter) => console.log("Applied Filters", filter)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => {
            const isSelected = selectedVenue === venue.id
            return (
              <Card
                key={venue.id}
                className={`overflow-hidden cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary border-primary" : "hover:shadow-lg"
                  }`}
                onClick={() => {
                  navigate(`/venue/${venue.id}`)
                  navigate(`/dashboard/venue/${venue.id}`)
                  setSelectedVenue(venue.id)
                }}
              >
                <div className="relative aspect-video">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground text-lg mb-2">{venue.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Capacity: {venue.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      <span className="font-semibold text-foreground">{venue.pricePerDay.toLocaleString()} / day</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant={isSelected ? "default" : "outline"}>
                    {isSelected ? "Selected" : "Select Venue"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedVenue && (
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Configure your venue booking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label className="text-foreground">Selected Venue</Label>
                  <p className="text-lg font-semibold text-primary mt-1">{selectedVenueData?.name}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Number of Days</Label>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="days"
                      type="number"
                      min={1}
                      max={7}
                      value={numberOfDays}
                      onChange={(e) => setNumberOfDays(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-24"
                    />
                    <span className="text-muted-foreground">day(s)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">
                    Price per day: ₹{selectedVenueData?.pricePerDay.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="text-foreground">Total Cost:</span>
                  <span className="text-primary">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>

              <Button className="mt-6" size="lg">
                Confirm Venue Booking
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
  )
}
