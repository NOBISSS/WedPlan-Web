;

import { useState } from "react";
;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";


export function MenuGallery({ menuImages }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % menuImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + menuImages.length) % menuImages.length);
    }
  };

  if (menuImages.length === 0) return null;

  return (
    <>
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            Menu Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {menuImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Menu ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                  <span className="text-background opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    View Menu
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-background hover:bg-background/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-background hover:bg-background/20"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="relative w-full max-w-4xl aspect-[4/3] mx-4">
            <img
              src={menuImages[selectedImage] || "/placeholder.svg"}
              alt={`Menu ${selectedImage + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-background hover:bg-background/20"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-background text-sm">
            {selectedImage + 1} / {menuImages.length}
          </div>
        </div>
      )}
    </>
  );
}
