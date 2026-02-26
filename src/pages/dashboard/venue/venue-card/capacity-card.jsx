import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Trees, BedDouble, Car, Users } from "lucide-react";
import { VenueDetail } from "../VenueDetail";


export function CapacityCard({ details }) {
  const capacityItems = [
    {
      icon: Building2,
      label: "Halls",
      count: details.totalHall,
      capacity: details.hallCapacity,
    },
    {
      icon: Trees,
      label: "Lawns",
      count: details.totalLawn,
      capacity: details.lawnCapacity,
    },
    {
      icon: BedDouble,
      label: "Rooms",
      count: details.totalRoom,
      capacity: details.roomCapacity,
    },
    {
      icon: Car,
      label: "Parking",
      count: null,
      capacity: details.parkingCapacity,
    },
  ];

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Capacity & Spaces
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {capacityItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground">
                  {item.count !== null && `${item.count} × `}
                  {item.capacity} guests
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
