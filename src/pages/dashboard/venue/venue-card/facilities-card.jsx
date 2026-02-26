import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Wind,
  Wifi,
  CarFront,
  Crown,
  UtensilsCrossed,
  Music,
  Palette,
  Camera,
  Zap,
  Shield,
  Video,
  Accessibility,
} from "lucide-react";
import { VenueDetail } from "../VenueDetail";


const facilityIcons = {
  "Air Conditioning": Wind,
  WiFi: Wifi,
  "Valet Parking": CarFront,
  "Bridal Suite": Crown,
  "In-house Catering": UtensilsCrossed,
  "DJ & Sound System": Music,
  "Decoration Services": Palette,
  "Photography Area": Camera,
  "Power Backup": Zap,
  Security: Shield,
  CCTV: Video,
  "Wheelchair Accessible": Accessibility,
};

export function FacilitiesCard({ details }) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Facilities & Amenities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {details.facilities.map((facility) => {
            const Icon = facilityIcons[facility] || Sparkles;
            return (
              <Badge
                key={facility}
                variant="outline"
                className="px-3 py-1.5 gap-1.5 text-sm font-normal border-border hover:bg-secondary transition-colors"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                {facility}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
