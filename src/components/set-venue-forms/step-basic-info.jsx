

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Building2 } from "lucide-react"

// interface BasicInfoData {
//   venueName: string
//   venueType: string
//   venueOwner: string
//   isActive: boolean
//   isVerified: boolean
// }

// interface StepBasicInfoProps {
//   data: BasicInfoData
//   onChange: (data: BasicInfoData) => void
//   errors: Record<string, string>
// }

const venueTypes = [
  "Banquet Hall",
  "Farm House",
  "Hotel",
  "Resort",
  "Open Ground",
]

export function StepBasicInfo({ data, onChange, errors }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Basic Venue Information</CardTitle>
            <CardDescription>Enter the primary details about the venue</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="venueName">
              Venue Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="venueName"
              placeholder="Enter venue name"
              value={data.venueName}
              onChange={(e) => handleChange("venueName", e.target.value)}
              className={errors.venueName ? "border-destructive" : ""}
            />
            {errors.venueName && (
              <p className="text-sm text-destructive">{errors.venueName}</p>
            )}
            <p className="text-xs text-muted-foreground">
              The official name of the venue as it should appear on listings
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venueType">Venue Type</Label>
            <Select
              value={data.venueType}
              onValueChange={(value) => handleChange("venueType", value)}
            >
              <SelectTrigger id="venueType" className="w-full">
                <SelectValue placeholder="Select venue type" />
              </SelectTrigger>
              <SelectContent>
                {venueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Category that best describes this venue
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venueOwner">Venue Owner</Label>
            <Input
              id="venueOwner"
              placeholder="Enter venue owner name"
              value={data.venueOwner}
              onChange={(e) => handleChange("venueOwner", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Legal owner of the venue property
            </p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="text-sm font-medium mb-4">Status Settings</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="isActive" className="text-sm font-medium">
                  Active Status
                </Label>
                <p className="text-xs text-muted-foreground">
                  Venue will be visible to customers
                </p>
              </div>
              <Switch
                id="isActive"
                checked={data.isActive}
                onCheckedChange={(checked) => handleChange("isActive", checked)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="isVerified" className="text-sm font-medium">
                  Verified Status
                </Label>
                <p className="text-xs text-muted-foreground">
                  Mark venue as verified
                </p>
              </div>
              <Switch
                id="isVerified"
                checked={data.isVerified}
                onCheckedChange={(checked) => handleChange("isVerified", checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
