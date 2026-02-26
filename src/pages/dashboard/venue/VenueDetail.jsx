import { venueData } from "@/data/venue-data";
import { ImageGallery } from "./venue-card/image-gallery";
import { VenueHeader } from "./venue-card/venue-header";
import { CapacityCard } from "./venue-card/capacity-card";
import { FacilitiesCard } from "./venue-card/facilities-card";
import { ContactCard } from "./venue-card/contact-card";
import { TimingsCard } from "./venue-card/timings-card";
import { PricingCard } from "./venue-card/pricing-card";
import { PoliciesCard } from "./venue-card/policies-card";
import { MenuGallery } from "./venue-card/menu-gallery";
import { DocumentsCard } from "./venue-card/documents-card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export const VenueDetail = () => {
  const { venue, details, operations } = venueData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <Link to="/dashboard/venue">
                <ArrowLeft className="h-4 w-4" />
                Back to Search
              </Link>
            </Button>
            <div className="text-sm font-medium text-primary">Wedding Venues</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery images={details.images} venueName={venue.name} />

            {/* Venue Header */}
            <VenueHeader venue={venue} details={details} />

            {/* Capacity Card */}
            <CapacityCard details={details} />

            {/* Facilities Card */}
            <FacilitiesCard details={details} />

            {/* Policies Card */}
            <PoliciesCard operations={operations} details={details} />

            {/* Menu Gallery */}
            <MenuGallery menuImages={details.menuImages} />

            {/* Documents Card */}
            <DocumentsCard details={details} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <PricingCard operations={operations} details={details} />

            {/* Operating Hours */}
            <TimingsCard operations={operations} />

            {/* Contact Information */}
            <ContactCard details={details} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Wedding Vendor Platform. All rights reserved.</p>
            <p className="mt-1">Find your perfect venue for your special day.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
