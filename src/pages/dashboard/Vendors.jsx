

import React from "react"

import { useState } from "react"
import {
  Flower2,
  Camera,
  UtensilsCrossed,
  Sparkles,
  Music,
  Package,
  Users,
  Scissors,
  Mic,
  Plus,
  Check,
  Star,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/DashboardLayout"

const vendorCategories = [
  { id: "decorator", name: "Decorator", icon: Flower2, color: "bg-pink-500" },
  { id: "photographer", name: "Photographer", icon: Camera, color: "bg-blue-500" },
  { id: "caterer", name: "Caterer", icon: UtensilsCrossed, color: "bg-orange-500" },
  { id: "mehndi", name: "Mehndi Artist", icon: Sparkles, color: "bg-emerald-500" },
  { id: "music", name: "Music / DJ", icon: Music, color: "bg-purple-500" },
  { id: "rental", name: "Rental Services", icon: Package, color: "bg-cyan-500" },
  { id: "choreographer", name: "Choreographer", icon: Users, color: "bg-indigo-500" },
  { id: "beautyparlour", name: "Beauty Parlour", icon: Scissors, color: "bg-rose-500" },
  { id: "anchor", name: "Anchor / Host", icon: Mic, color: "bg-amber-500" },
]

const defaultVendors = [
  { id: 1, category: "decorator", name: "Bloom Decorations", rating: 4.8, price: 25000, phone: "9876543210" },
  { id: 2, category: "photographer", name: "Capture Moments Studio", rating: 4.9, price: 50000, phone: "9876543211" },
  { id: 3, category: "caterer", name: "Royal Feast Caterers", rating: 4.7, price: 800, phone: "9876543212" },
  { id: 4, category: "mehndi", name: "Henna Arts by Priya", rating: 4.6, price: 5000, phone: "9876543213" },
  { id: 5, category: "music", name: "DJ Beats Entertainment", rating: 4.5, price: 15000, phone: "9876543214" },
  { id: 6, category: "rental", name: "Event Essentials Rental", rating: 4.4, price: 30000, phone: "9876543215" },
  { id: 7, category: "choreographer", name: "Dance Studio Pro", rating: 4.8, price: 20000, phone: "9876543216" },
  { id: 8, category: "beautyparlour", name: "Glamour Salon & Spa", rating: 4.9, price: 15000, phone: "9876543217" },
  { id: 9, category: "anchor", name: "Voice of Events", rating: 4.7, price: 10000, phone: "9876543218" },
]


export default function VendorsPage() {
  const [selectedVendors, setSelectedVendors] = useState([])
  const [customVendors, setCustomVendors] = useState([])
  const [newVendor, setNewVendor] = useState({ category: "", name: "", phone: "", price: "" })

  const toggleVendor = (vendorId) => {
    setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]))
  }

  const handleAddCustomVendor = (e) => {
    e.preventDefault()
    if (newVendor.name && newVendor.category && newVendor.phone) {
      setCustomVendors([...customVendors, { ...newVendor, id: Date.now() }])
      setNewVendor({ category: "", name: "", phone: "", price: "" })
    }
  }

  const getVendorIcon = (categoryId) => {
    const category = vendorCategories.find((c) => c.id === categoryId)
    return category?.icon || Package
  }

  const getVendorColor = (categoryId) => {
    const category = vendorCategories.find((c) => c.id === categoryId)
    return category?.color || "bg-gray-500"
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Vendor Management</h1>
          <p className="text-muted-foreground mt-1">Choose default vendors or add your own</p>
        </div>

        {/* Vendor Categories */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {vendorCategories.map((category) => (
            <Card key={category.id} className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-3">
                <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-medium text-foreground truncate">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="default" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="default">Default Vendors</TabsTrigger>
            <TabsTrigger value="custom">Custom Vendors</TabsTrigger>
          </TabsList>

          <TabsContent value="default" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {defaultVendors.map((vendor) => {
                const isSelected = selectedVendors.includes(vendor.id)
                const VendorIcon = getVendorIcon(vendor.category)
                return (
                  <Card
                    key={vendor.id}
                    className={`cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-primary border-primary" : "hover:shadow-md"
                    }`}
                    onClick={() => toggleVendor(vendor.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-12 h-12 ${getVendorColor(vendor.category)} rounded-xl flex items-center justify-center`}
                        >
                          <VendorIcon className="h-6 w-6 text-white" />
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "bg-primary border-primary" : "border-muted-foreground"
                          }`}
                        >
                          {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{vendor.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize mb-2">
                        {vendorCategories.find((c) => c.id === vendor.category)?.name}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="text-foreground font-medium">{vendor.rating}</span>
                        </div>
                        <span className="text-muted-foreground">₹{vendor.price.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {selectedVendors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Vendors ({selectedVendors.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendors.map((id) => {
                      const vendor = defaultVendors.find((v) => v.id === id)
                      return (
                        <span
                          key={id}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {vendor?.name}
                        </span>
                      )
                    })}
                  </div>
                  <Button className="mt-4">Confirm Selection</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Custom Vendor</CardTitle>
                <CardDescription>Add your own preferred vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCustomVendor} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="vendorCategory">Vendor Category</Label>
                      <Select
                        value={newVendor.category}
                        onValueChange={(value) => setNewVendor({ ...newVendor, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {vendorCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendorName">Vendor Name</Label>
                      <Input
                        id="vendorName"
                        placeholder="Enter vendor name"
                        value={newVendor.name}
                        onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendorPhone">Phone Number</Label>
                      <Input
                        id="vendorPhone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={newVendor.phone}
                        onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendorPrice">Price (Optional)</Label>
                      <Input
                        id="vendorPrice"
                        type="number"
                        placeholder="Enter price"
                        value={newVendor.price}
                        onChange={(e) => setNewVendor({ ...newVendor, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vendor
                  </Button>
                </form>
              </CardContent>
            </Card>

            {customVendors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Custom Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {customVendors.map((vendor) => {
                      const VendorIcon = getVendorIcon(vendor.category)
                      return (
                        <div key={vendor.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 ${getVendorColor(vendor.category)} rounded-lg flex items-center justify-center`}
                            >
                              <VendorIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{vendor.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {vendorCategories.find((c) => c.id === vendor.category)?.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {vendor.phone}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
  )
}
