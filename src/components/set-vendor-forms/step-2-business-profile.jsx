import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase } from "lucide-react"

// interface BusinessProfileData {
//   businessName: string
//   description: string
//   yearsExperience: string
//   businessAddress: string
//   email: string
//   website: string
//   panNumber: string
//   upiId: string
// }

// interface Step2BusinessProfileProps {
//   data: BusinessProfileData
//   onChange: (data: BusinessProfileData) => void
//   errors: Record<string, string>
// }

export function Step2BusinessProfile({
  data,
  onChange,
  errors,
}) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Business Profile & Location Details</CardTitle>
            <CardDescription>
              Provide business information and contact details
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="Enter business name"
              value={data.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Registered business or brand name
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearsExperience">Years of Experience</Label>
            <Input
              id="yearsExperience"
              type="number"
              placeholder="0"
              value={data.yearsExperience}
              onChange={(e) => handleChange("yearsExperience", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Total years in the wedding industry
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="vendor@example.com"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Business email for communication
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              value={data.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Portfolio or business website
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN Number</Label>
            <Input
              id="panNumber"
              placeholder="ABCDE1234F"
              value={data.panNumber}
              onChange={(e) => handleChange("panNumber", e.target.value.toUpperCase())}
              className={errors.panNumber ? "border-destructive" : ""}
            />
            {errors.panNumber && (
              <p className="text-sm text-destructive">{errors.panNumber}</p>
            )}
            <p className="text-xs text-muted-foreground">
              For tax and verification purposes
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID (Optional)</Label>
            <Input
              id="upiId"
              placeholder="vendor@upi"
              value={data.upiId}
              onChange={(e) => handleChange("upiId", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              For receiving payments
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Business Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your services, expertise, and what makes you unique..."
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            A detailed description of your services and experience
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessAddress">Business Address</Label>
          <Textarea
            id="businessAddress"
            placeholder="Enter full business address including city and pincode"
            value={data.businessAddress}
            onChange={(e) => handleChange("businessAddress", e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Physical location of your business
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
