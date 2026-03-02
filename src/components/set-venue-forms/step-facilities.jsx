import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Sparkles, 
  Car, 
  Wifi, 
  Zap, 
  Wind, 
  Palette, 
  UtensilsCrossed,
  Upload,
  FileText,
  ImageIcon,
  X
} from "lucide-react"
import { useCallback } from "react"

// interface FacilitiesData {
//   facilities: string[]
//   foodType: string
//   panNumber: string
//   upiId: string
//   fssaiCertificate: File | null
//   venueImages: File[]
//   menuImages: File[]
// }

// interface StepFacilitiesProps {
//   data: FacilitiesData
//   onChange: (data: FacilitiesData) => void
//   errors: Record<string, string>
// }

const facilitiesOptions = [
  { id: "parking", label: "Parking", icon: Car },
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "power-backup", label: "Power Backup", icon: Zap },
  { id: "ac", label: "AC", icon: Wind },
  { id: "decoration", label: "Decoration", icon: Palette },
  { id: "catering", label: "Catering", icon: UtensilsCrossed },
]

export function StepFacilities({ data, onChange, errors }) {
  const handleFacilityChange = (facilityId, checked) => {
    const newFacilities = checked
      ? [...data.facilities, facilityId]
      : data.facilities.filter((f) => f !== facilityId)
    onChange({ ...data, facilities: newFacilities })
  }

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const handleFileChange = useCallback((
    field,
    files
  ) => {
    if (!files) return

    if (field === "fssaiCertificate") {
      onChange({ ...data, [field]: files[0] || null })
    } else {
      const existingFiles = data[field]
      const newFiles = Array.from(files)
      onChange({ ...data, [field]: [...existingFiles, ...newFiles] })
    }
  }, [data, onChange])

  const removeFile = (field, index) => {
    const newFiles = [...(data[field])]
    newFiles.splice(index, 1)
    onChange({ ...data, [field]: newFiles })
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Facilities & Documents</CardTitle>
            <CardDescription>Add amenities, food options, and required documents</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Facilities Section */}
        <div>
          <h4 className="text-sm font-medium mb-4">Available Facilities</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {facilitiesOptions.map((facility) => {
              const Icon = facility.icon
              const isChecked = data.facilities.includes(facility.id)
              return (
                <label
                  key={facility.id}
                  className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                    isChecked
                      ? "border-primary bg-primary/5"
                      : "hover:border-muted-foreground/50"
                  }`}
                >
                  <Checkbox
                    id={facility.id}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleFacilityChange(facility.id, checked)
                    }
                  />
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{facility.label}</span>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {/* Food Type Section */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium mb-4">Food Type</h4>
          <RadioGroup
            value={data.foodType}
            onValueChange={(value) => handleChange("foodType", value)}
            className="flex flex-wrap gap-4"
          >
            {[
              { value: "veg", label: "Vegetarian" },
              { value: "non-veg", label: "Non-Vegetarian" },
              { value: "both", label: "Both" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                  data.foodType === option.value
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/50"
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Documents Section */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium mb-4">Business Documents</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="panNumber">
                PAN Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="panNumber"
                placeholder="ABCDE1234F"
                value={data.panNumber}
                onChange={(e) => handleChange("panNumber", e.target.value.toUpperCase())}
                className={errors.panNumber ? "border-destructive" : ""}
                maxLength={10}
              />
              {errors.panNumber && (
                <p className="text-sm text-destructive">{errors.panNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="upiId">
                UPI ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="upiId"
                placeholder="venue@upi"
                value={data.upiId}
                onChange={(e) => handleChange("upiId", e.target.value)}
                className={errors.upiId ? "border-destructive" : ""}
              />
              {errors.upiId && (
                <p className="text-sm text-destructive">{errors.upiId}</p>
              )}
            </div>
          </div>
        </div>

        {/* File Uploads Section */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium mb-4">Upload Documents & Images</h4>
          <div className="space-y-6">
            {/* FSSAI Certificate */}
            <div className="space-y-2">
              <Label>FSSAI Certificate</Label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, PNG or JPG (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange("fssaiCertificate", e.target.files)}
                />
              </label>
              {data.fssaiCertificate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{data.fssaiCertificate.name}</span>
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, fssaiCertificate: null })}
                    className="ml-auto text-destructive hover:text-destructive/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Venue Images */}
            <div className="space-y-2">
              <Label>Venue Images</Label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Upload venue photos</span>
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (Multiple files allowed)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange("venueImages", e.target.files)}
                />
              </label>
              {data.venueImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.venueImages.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md text-sm"
                    >
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate max-w-[150px]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile("venueImages", index)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Images */}
            <div className="space-y-2">
              <Label>Menu Images</Label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Upload menu cards</span>
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or PDF (Multiple files allowed)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  multiple
                  onChange={(e) => handleFileChange("menuImages", e.target.files)}
                />
              </label>
              {data.menuImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.menuImages.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md text-sm"
                    >
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate max-w-[150px]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile("menuImages", index)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
