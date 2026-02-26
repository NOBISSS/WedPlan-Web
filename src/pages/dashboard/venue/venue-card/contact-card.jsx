import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, User, UserCog, ExternalLink } from "lucide-react";
import { VenueDetail } from "../VenueDetail";


export function ContactCard({ details }) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Owner</p>
              <p className="text-sm font-medium text-foreground">{details.ownersFullName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Manager</p>
              <p className="text-sm font-medium text-foreground">{details.manager}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
            <a href={`tel:${details.contactNo}`}>
              <Phone className="h-4 w-4" />
              {details.contactNo}
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
            <a href={`mailto:${details.email}`}>
              <Mail className="h-4 w-4" />
              {details.email}
            </a>
          </Button>
          <Button
            className="w-full justify-start gap-2 bg-success hover:bg-success/90 text-background"
            asChild
          >
            <a
              href={`https://wa.me/${details.whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
              <ExternalLink className="h-3 w-3 ml-auto" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
