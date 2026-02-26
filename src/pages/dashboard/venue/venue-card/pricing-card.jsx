import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, Calendar, Heart, Share2, MapPin } from "lucide-react";
import { VenueDetail } from "../VenueDetail";


export function PricingCard({ operations, details }) {
  const formattedPrice = new Intl.NumberFormat("en-IN").format(operations.price);

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-primary" />
            Pricing
          </CardTitle>
          <Badge className="bg-primary text-primary-foreground">Per Event</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="text-center py-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center justify-center gap-1">
            <IndianRupee className="h-6 w-6 text-primary" />
            <span className="text-3xl font-bold text-foreground">{formattedPrice}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Starting price</p>
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Check Availability
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Heart className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          <Button variant="secondary" className="w-full gap-2" asChild>
            <a href={details.googleMapLink} target="_blank" rel="noopener noreferrer">
              <MapPin className="h-4 w-4" />
              View on Map
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
