import React from "react"

import { useRef } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, X, User } from "lucide-react"

// interface BasicInfoData {
//   vendorName: string
//   vendorType: string
//   contactNumber: string
//   city: string
//   coverImage: File | null
//   coverImagePreview: string | null
//   status: string
//   isVerified: boolean
// }

// interface Step1BasicInfoProps {
//   data: BasicInfoData
//   onChange: (data: BasicInfoData) => void
//   errors: Record<string, string>
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

const STATUS_OPTIONS = ["Active", "Inactive"]

export function Step1BasicInfo({ data, onChange, errors }) {
  const coverInputRef = useRef(null)

  const handleChange = (
    field,
    value
  ) => {
    onChange({ ...data, [field]: value })
  }

  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange({
          ...data,
          coverImage: file,
          coverImagePreview: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeCoverImage = () => {
    onChange({
      ...data,
      coverImage: null,
      coverImagePreview: null,
    })
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Basic Vendor Information</CardTitle>
            <CardDescription>
              Enter the primary details about the vendor
            </CardDescription>
          </div>
        </div>
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
              value={data.vendorName}
              onChange={(e) => handleChange("vendorName", e.target.value)}
              className={errors.vendorName ? "border-destructive" : ""}
            />
            {errors.vendorName && (
              <p className="text-sm text-destructive">{errors.vendorName}</p>
            )}
            <p className="text-xs text-muted-foreground">
              The name of the vendor as it should appear on listings
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendorType">
              Vendor Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={data.vendorType}
              onValueChange={(value) => handleChange("vendorType", value)}
            >
              <SelectTrigger
                id="vendorType"
                className={errors.vendorType ? "border-destructive" : ""}
              >
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
            {errors.vendorType && (
              <p className="text-sm text-destructive">{errors.vendorType}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Category that best describes this vendor
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">
              Contact Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="Enter contact number"
              value={data.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
              className={errors.contactNumber ? "border-destructive" : ""}
            />
            {errors.contactNumber && (
              <p className="text-sm text-destructive">{errors.contactNumber}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Primary contact number for the vendor
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              placeholder="Enter city"
              value={data.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={errors.city ? "border-destructive" : ""}
            />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city}</p>
            )}
            <p className="text-xs text-muted-foreground">
              City where the vendor operates
            </p>
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
            {data.coverImagePreview ? (
              <div className="relative inline-block">
                <img
                  src={data.coverImagePreview || "/placeholder.svg"}
                  alt="Cover preview"
                  className="max-h-40 rounded-lg mx-auto object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeCoverImage()
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
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            A high-quality image representing the vendor&apos;s work
          </p>
        </div>

        <div className="border-t pt-6">
          <h4 className="text-sm font-medium mb-4">Status Settings</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status (Admin Only)</Label>
              <Select
                value={data.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger id="status">
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
                <Label htmlFor="isVerified" className="text-sm font-medium">
                  Verified Status
                </Label>
                <p className="text-xs text-muted-foreground">
                  Only admins can change this
                </p>
              </div>
              <Switch
                id="isVerified"
                checked={data.isVerified}
                onCheckedChange={(checked) => handleChange("isVerified", checked)}
                disabled
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
