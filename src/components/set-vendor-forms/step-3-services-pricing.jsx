/* eslint-disable no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  IndianRupee,
  Plus,
  Trash2,
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

// interface ServicesPricingData {
//   priceStart: string
//   discountPrice: string
//   priceUnit: string
//   services: Service[]
// }

// interface Step3ServicesPricingProps {
//   data: ServicesPricingData
//   onChange: (data: ServicesPricingData) => void
//   errors: Record<string, string>
// }

const PRICE_UNITS = [
  { value: "per_event", label: "Per Event" },
  { value: "per_day", label: "Per Day" },
  { value: "per_hour", label: "Per Hour" },
  { value: "per_person", label: "Per Person" },
]

export function Step3ServicesPricing({
  data,
  onChange,
  errors,
}) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      name: "",
      price: "",
      unit: "per_event",
    }
    onChange({ ...data, services: [...data.services, newService] })
  }

  const removeService = (id) => {
    if (data.services.length > 1) {
      onChange({
        ...data,
        services: data.services.filter((s) => s.id !== id),
      })
    }
  }

  const updateService = (id, field, value) => {
    onChange({
      ...data,
      services: data.services.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    })
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <IndianRupee className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Services & Pricing</CardTitle>
            <CardDescription>
              Set your pricing and define the services you offer
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Base Pricing */}
        <div>
          <h4 className="text-sm font-medium mb-4">Base Pricing</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="priceStart">Starting Price</Label>
              <Input
                id="priceStart"
                type="number"
                placeholder="0"
                value={data.priceStart}
                onChange={(e) => handleChange("priceStart", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Minimum price for your services
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPrice">Discount Price (Optional)</Label>
              <Input
                id="discountPrice"
                type="number"
                placeholder="0"
                value={data.discountPrice}
                onChange={(e) => handleChange("discountPrice", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Special promotional price
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceUnit">Price Unit</Label>
              <Select
                value={data.priceUnit}
                onValueChange={(value) => handleChange("priceUnit", value)}
              >
                <SelectTrigger id="priceUnit">
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
              <p className="text-xs text-muted-foreground">
                How you charge for services
              </p>
            </div>
          </div>
        </div>

        {/* Read-only Stats */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium mb-4">Performance Metrics (Read-only)</h4>
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
        </div>

        {/* Dynamic Services */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium">Service Packages</h4>
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

          <div className="space-y-4">
            {data.services.map((service, index) => (
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

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeService(service.id)}
                  disabled={data.services.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove service</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
