import { Badge } from "@/components/ui/badge";
import { MapPin, BadgeCheck, Star } from "lucide-react";

export function VenueHeader({ venue, details }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {venue.name}
            </h1>
            {venue.isVerified && (
              <BadgeCheck className="h-6 w-6 text-primary fill-primary/20" />
            )}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {details.address}, {details.city} - {details.pincode}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
          {venue.type}
        </Badge>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="text-sm font-medium">4.8</span>
          <span className="text-sm text-muted-foreground">(124 reviews)</span>
        </div>
        {venue.isActive && (
          <Badge variant="outline" className="border-success text-success">
            Available
          </Badge>
        )}
      </div>
    </div>
  );
}
