

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Building, Trees, Car } from "lucide-react"

// interface CapacityData {
//   totalRooms: string
//   totalHalls: string
//   totalLawns: string
//   roomCapacity: string
//   hallCapacity: string
//   lawnCapacity: string
//   parkingCapacity: string
// }

// interface StepCapacityProps {
//   data: CapacityData
//   onChange: (data: CapacityData) => void
// }

export function StepCapacity({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Capacity & Infrastructure</CardTitle>
            <CardDescription>Specify the venue spaces and their capacities</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Total Count Section */}
        <div>
          <h4 className="text-sm font-medium mb-4">Total Venue Spaces</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
                  <Building className="h-4 w-4 text-accent-foreground" />
                </div>
                <Label htmlFor="totalRooms" className="text-sm font-medium">
                  Total Rooms
                </Label>
              </div>
              <Input
                id="totalRooms"
                type="number"
                placeholder="0"
                min="0"
                value={data.totalRooms}
                onChange={(e) => handleChange("totalRooms", e.target.value)}
              />
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
                  <Building className="h-4 w-4 text-accent-foreground" />
                </div>
                <Label htmlFor="totalHalls" className="text-sm font-medium">
                  Total Halls
                </Label>
              </div>
              <Input
                id="totalHalls"
                type="number"
                placeholder="0"
                min="0"
                value={data.totalHalls}
                onChange={(e) => handleChange("totalHalls", e.target.value)}
              />
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
                  <Trees className="h-4 w-4 text-accent-foreground" />
                </div>
                <Label htmlFor="totalLawns" className="text-sm font-medium">
                  Total Lawns
                </Label>
              </div>
              <Input
                id="totalLawns"
                type="number"
                placeholder="0"
                min="0"
                value={data.totalLawns}
                onChange={(e) => handleChange("totalLawns", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Capacity Section */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium mb-4">Guest Capacity</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="roomCapacity" className="text-sm font-medium">
                  Room Capacity
                </Label>
              </div>
              <Input
                id="roomCapacity"
                type="number"
                placeholder="0"
                min="0"
                value={data.roomCapacity}
                onChange={(e) => handleChange("roomCapacity", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Max guests per room</p>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="hallCapacity" className="text-sm font-medium">
                  Hall Capacity
                </Label>
              </div>
              <Input
                id="hallCapacity"
                type="number"
                placeholder="0"
                min="0"
                value={data.hallCapacity}
                onChange={(e) => handleChange("hallCapacity", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Max guests per hall</p>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="lawnCapacity" className="text-sm font-medium">
                  Lawn Capacity
                </Label>
              </div>
              <Input
                id="lawnCapacity"
                type="number"
                placeholder="0"
                min="0"
                value={data.lawnCapacity}
                onChange={(e) => handleChange("lawnCapacity", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Max guests per lawn</p>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="parkingCapacity" className="text-sm font-medium">
                  Parking Capacity
                </Label>
              </div>
              <Input
                id="parkingCapacity"
                type="number"
                placeholder="0"
                min="0"
                value={data.parkingCapacity}
                onChange={(e) => handleChange("parkingCapacity", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">No. of vehicles</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
