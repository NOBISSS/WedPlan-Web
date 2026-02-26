import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Volume2, XCircle, Leaf, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VenueDetail } from "../VenueDetail";


const foodTypeLabels = {
  veg: { label: "Vegetarian Only", icon: Leaf, color: "text-success" },
  nonveg: { label: "Non-Vegetarian Available", icon: Utensils, color: "text-destructive" },
  other: { label: "Both Veg & Non-Veg", icon: Utensils, color: "text-primary" },
};

export function PoliciesCard({ operations, details }) {
  const foodInfo = foodTypeLabels[details.foodType];

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Policies & Restrictions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Food Type */}
          <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
            <div className={`mt-0.5 ${foodInfo.color}`}>
              <foodInfo.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Food Type</p>
              <Badge variant="outline" className="mt-1">
                {foodInfo.label}
              </Badge>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
            <div className="text-warning mt-0.5">
              <XCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Cancellation Policy</p>
              <p className="text-sm text-muted-foreground mt-1">{operations.cancellationPolicy}</p>
            </div>
          </div>

          {/* Noise Restrictions */}
          <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
            <div className="text-destructive mt-0.5">
              <Volume2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Noise Restrictions</p>
              <p className="text-sm text-muted-foreground mt-1">{operations.noiseRestrictions}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
