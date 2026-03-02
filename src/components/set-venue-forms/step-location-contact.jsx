import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, User, Phone } from "lucide-react"

  // interface LocationContactData {
  //   fullAddress: string
  //   city: string
  //   pincode: string
  //   googleMapLink: string
  //   ownerFullName: string
  //   managerName: string
  //   contactNumber: string
  //   emailAddress: string
  //   whatsappNumber: string
  // }

  // interface StepLocationContactProps {
  //   data: LocationContactData
  //   onChange: (data: LocationContactData) => void
  //   errors: Record<string, string>
  // }

export function StepLocationContact({ data, onChange, errors }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Location & Contact Details</CardTitle>
            <CardDescription>Provide the venue address and contact information</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Address Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">Address Information</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fullAddress">
                Full Address <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="fullAddress"
                placeholder="Enter complete address with landmark"
                value={data.fullAddress}
                onChange={(e) => handleChange("fullAddress", e.target.value)}
                className={errors.fullAddress ? "border-destructive" : ""}
                rows={3}
              />
              {errors.fullAddress && (
                <p className="text-sm text-destructive">{errors.fullAddress}</p>
              )}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">
                Pincode <span className="text-destructive">*</span>
              </Label>
              <Input
                id="pincode"
                placeholder="Enter pincode"
                value={data.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                className={errors.pincode ? "border-destructive" : ""}
              />
              {errors.pincode && (
                <p className="text-sm text-destructive">{errors.pincode}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="googleMapLink">Google Map Link</Label>
              <Input
                id="googleMapLink"
                type="url"
                placeholder="https://maps.google.com/..."
                value={data.googleMapLink}
                onChange={(e) => handleChange("googleMapLink", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Paste the Google Maps URL for easy navigation
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">Contact Information</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ownerFullName">
                Owner Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ownerFullName"
                placeholder="Enter owner's full name"
                value={data.ownerFullName}
                onChange={(e) => handleChange("ownerFullName", e.target.value)}
                className={errors.ownerFullName ? "border-destructive" : ""}
              />
              {errors.ownerFullName && (
                <p className="text-sm text-destructive">{errors.ownerFullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Manager Name</Label>
              <Input
                id="managerName"
                placeholder="Enter manager's name"
                value={data.managerName}
                onChange={(e) => handleChange("managerName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">
                Contact Number <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contactNumber"
                  placeholder="+91 XXXXX XXXXX"
                  value={data.contactNumber}
                  onChange={(e) => handleChange("contactNumber", e.target.value)}
                  className={`pl-10 ${errors.contactNumber ? "border-destructive" : ""}`}
                />
              </div>
              {errors.contactNumber && (
                <p className="text-sm text-destructive">{errors.contactNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="emailAddress"
                type="email"
                placeholder="venue@example.com"
                value={data.emailAddress}
                onChange={(e) => handleChange("emailAddress", e.target.value)}
                className={errors.emailAddress ? "border-destructive" : ""}
              />
              {errors.emailAddress && (
                <p className="text-sm text-destructive">{errors.emailAddress}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                placeholder="+91 XXXXX XXXXX"
                value={data.whatsappNumber}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                For direct customer inquiries
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
