/* eslint-disable no-unused-vars */
import React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Upload,
  X,
  Plus,
  Trash2,
  ImageIcon,
  Clock,
  Star,
  BookOpen,
  Calendar,
} from "lucide-react"

// interface Service {
//   id: string
//   name: string
//   price: string
//   unit: string
// }

// interface TimeSlot {
//   day: string
//   isOpen: boolean
//   openTime: string
//   closeTime: string
// }

const VENDOR_TYPES = [
  "Decorator",
  "Photographer",
  "Caterer",
  "Makeup Artist",
  "DJ / Music",
  "Florist",
  "Other",
]

const STATUS_OPTIONS = ["Active", "Inactive", "Blocked"]

const PRICE_UNITS = [
  { value: "per_event", label: "Per Event" },
  { value: "per_day", label: "Per Day" },
  { value: "per_hour", label: "Per Hour" },
  { value: "per_person", label: "Per Person" },
]

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export function CreateVendorForm() {
  // Basic Details State
  const [vendorName, setVendorName] = useState("")
  const [vendorType, setVendorType] = useState("")
  const [city, setCity] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [coverImage, setCoverImage] = useState(null)
  const [coverImagePreview, setCoverImagePreview] = useState(null)
  const [status, setStatus] = useState("Active")
  const [isVerified, setIsVerified] = useState(false)

  // Pricing State
  const [priceStart, setPriceStart] = useState("")
  const [discountPrice, setDiscountPrice] = useState("")
  const [priceUnit, setPriceUnit] = useState("")

  // Business Profile State
  const [businessName, setBusinessName] = useState("")
  const [description, setDescription] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [panNumber, setPanNumber] = useState("")
  const [upiId, setUpiId] = useState("")

  // Services State
  const [services, setServices] = useState([
    { id: "1", name: "", price: "", unit: "per_event" },
  ])

  // Media State
  const [portfolioImages, setPortfolioImages] = useState([])
  const [portfolioPreviews, setPortfolioPreviews] = useState([])

  // Availability State
  const [availableDates, setAvailableDates] = useState([])
  const [newDate, setNewDate] = useState("")
  const [weeklyTimings, setWeeklyTimings] = useState(
    DAYS_OF_WEEK.map((day) => ({
      day,
      isOpen: day !== "Sunday",
      openTime: "09:00",
      closeTime: "21:00",
    }))
  )
  const [cancellationPolicy, setCancellationPolicy] = useState("")
  const [restrictions, setRestrictions] = useState("")
  const [isAvailable, setIsAvailable] = useState(true)

  const coverInputRef = useRef<HTMLInputElement>(null)
  const portfolioInputRef = useRef<HTMLInputElement>(null)

  // Handlers
  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePortfolioImagesChange = (e) => {
    const files = Array.from(e.target.files || [])
    setPortfolioImages((prev) => [...prev, ...files])

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPortfolioPreviews((prev) => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePortfolioImage = (index) => {
    setPortfolioImages((prev) => prev.filter((_, i) => i !== index))
    setPortfolioPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const addService = () => {
    setServices((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", price: "", unit: "per_event" },
    ])
  }

  const removeService = (id) => {
    if (services.length > 1) {
      setServices((prev) => prev.filter((s) => s.id !== id))
    }
  }

  const updateService = (id, field, value) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    )
  }

  const addAvailableDate = () => {
    if (newDate && !availableDates.includes(newDate)) {
      setAvailableDates((prev) => [...prev, newDate].sort())
      setNewDate("")
    }
  }

  const removeAvailableDate = (date) => {
    setAvailableDates((prev) => prev.filter((d) => d !== date))
  }

  const updateTimeSlot = (
    day,
    field,
    value
  ) => {
    setWeeklyTimings((prev) =>
      prev.map((slot) => (slot.day === day ? { ...slot, [field]: value } : slot))
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Vendor Basic Details */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Vendor Basic Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vendorName">
                Vendor Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="vendorName"
                placeholder="Enter vendor name"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendorType">
                Vendor Type <span className="text-destructive">*</span>
              </Label>
              <Select value={vendorType} onValueChange={setVendorType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor type" />
                </SelectTrigger>
                <SelectContent>
                  {VENDOR_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">
                Contact Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="Enter contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div
              className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
              onClick={() => coverInputRef.current?.click()}
            >
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverImageChange}
              />
              {coverImagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={coverImagePreview || "/placeholder.svg"}
                    alt="Cover preview"
                    className="max-h-40 rounded-lg mx-auto object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCoverImage(null)
                      setCoverImagePreview(null)
                    }}
                    className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload cover image
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status (Admin Only)</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/30">
              <div className="space-y-0.5">
                <Label htmlFor="verified">Verified Status</Label>
                <p className="text-xs text-muted-foreground">
                  Only admins can change this
                </p>
              </div>
              <Switch
                id="verified"
                checked={isVerified}
                onCheckedChange={setIsVerified}
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Pricing Information */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Pricing Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="priceStart">Starting Price</Label>
              <Input
                id="priceStart"
                type="number"
                placeholder="0"
                value={priceStart}
                onChange={(e) => setPriceStart(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPrice">Discount Price (Optional)</Label>
              <Input
                id="discountPrice"
                type="number"
                placeholder="0"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceUnit">Price Unit</Label>
              <Select value={priceUnit} onValueChange={setPriceUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_UNITS.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Read-only Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 rounded-lg border p-4 bg-muted/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Star className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating Average</p>
                <p className="text-lg font-semibold text-foreground">0.0</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4 bg-muted/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <BookOpen className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-lg font-semibold text-foreground">0</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4 bg-muted/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Calendar className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-lg font-semibold text-foreground">0</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Vendor Business Profile */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Vendor Business Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">
                Business Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Enter business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Input
                id="yearsExperience"
                type="number"
                placeholder="0"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="vendor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="panNumber">
                PAN Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="panNumber"
                placeholder="Enter PAN number"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID (Optional)</Label>
              <Input
                id="upiId"
                placeholder="vendor@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your services and expertise..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <Textarea
              id="businessAddress"
              placeholder="Enter full business address"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Vendor Services */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-foreground">
              Vendor Services
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addService}
              className="gap-1 bg-transparent"
            >
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="grid grid-cols-1 md:grid-cols-[1fr_140px_160px_auto] gap-4 items-end p-4 rounded-lg border bg-muted/20"
            >
              <div className="space-y-2">
                <Label htmlFor={`service-name-${service.id}`}>
                  Service Name
                </Label>
                <Input
                  id={`service-name-${service.id}`}
                  placeholder="e.g., Wedding Photography"
                  value={service.name}
                  onChange={(e) =>
                    updateService(service.id, "name", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`service-price-${service.id}`}>Price</Label>
                <Input
                  id={`service-price-${service.id}`}
                  type="number"
                  placeholder="0"
                  value={service.price}
                  onChange={(e) =>
                    updateService(service.id, "price", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`service-unit-${service.id}`}>Unit</Label>
                <Select
                  value={service.unit}
                  onValueChange={(value) =>
                    updateService(service.id, "unit", value)
                  }
                >
                  <SelectTrigger id={`service-unit-${service.id}`}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRICE_UNITS.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeService(service.id)}
                disabled={services.length === 1}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Section 5: Vendor Media & Portfolio */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Vendor Media & Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Portfolio Images</Label>
            <div
              className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
              onClick={() => portfolioInputRef.current?.click()}
            >
              <input
                ref={portfolioInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePortfolioImagesChange}
              />
              <div className="space-y-2">
                <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload portfolio images
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB each (multiple allowed)
                </p>
              </div>
            </div>
          </div>

          {portfolioPreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {portfolioPreviews.map((preview, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePortfolioImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 6: Availability & Operations */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Availability & Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Available Dates */}
          <div className="space-y-3">
            <Label>Available Dates</Label>
            <div className="flex gap-2">
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="max-w-50"
              />
              <Button type="button" variant="outline" onClick={addAvailableDate}>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {availableDates.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {availableDates.map((date) => (
                  <div
                    key={date}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm"
                  >
                    {new Date(date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    <button
                      type="button"
                      onClick={() => removeAvailableDate(date)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weekly Timings */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Weekly Timings
            </Label>
            <div className="space-y-2">
              {weeklyTimings.map((slot) => (
                <div
                  key={slot.day}
                  className="grid grid-cols-[120px_auto_1fr_1fr] gap-3 items-center p-3 rounded-lg border bg-muted/20"
                >
                  <span className="text-sm font-medium text-foreground">
                    {slot.day}
                  </span>
                  <Switch
                    checked={slot.isOpen}
                    onCheckedChange={(checked) =>
                      updateTimeSlot(slot.day, "isOpen", checked)
                    }
                  />
                  <Input
                    type="time"
                    value={slot.openTime}
                    onChange={(e) =>
                      updateTimeSlot(slot.day, "openTime", e.target.value)
                    }
                    disabled={!slot.isOpen}
                    className="text-sm"
                  />
                  <Input
                    type="time"
                    value={slot.closeTime}
                    onChange={(e) =>
                      updateTimeSlot(slot.day, "closeTime", e.target.value)
                    }
                    disabled={!slot.isOpen}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
              <Textarea
                id="cancellationPolicy"
                placeholder="Describe your cancellation policy..."
                value={cancellationPolicy}
                onChange={(e) => setCancellationPolicy(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="restrictions">
                Service Restrictions / Notes
              </Label>
              <Textarea
                id="restrictions"
                placeholder="Any restrictions or special notes..."
                value={restrictions}
                onChange={(e) => setRestrictions(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/30">
            <div className="space-y-0.5">
              <Label htmlFor="isAvailable">Currently Available</Label>
              <p className="text-xs text-muted-foreground">
                Toggle off if you're not accepting bookings
              </p>
            </div>
            <Switch
              id="isAvailable"
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
          </div>
        </CardContent>
      </Card>

      {/* Section 7: Admin Metadata (Read-only) */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-muted-foreground">
            Admin Metadata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-muted/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Created At
              </p>
              <p className="text-sm font-medium text-foreground mt-1">
                Not yet created
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Updated At
              </p>
              <p className="text-sm font-medium text-foreground mt-1">
                Not yet created
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Soft Deleted
              </p>
              <p className="text-sm font-medium text-foreground mt-1">No</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto bg-transparent"
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Save Vendor
        </Button>
      </div>
    </form>
  )
}
