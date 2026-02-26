

import { useState } from "react"
import { Send, Eye, Heart, Calendar, MapPin, Clock, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/DashboardLayout"

const invitationTemplates = [
  {
    id: 1,
    name: "Classic Elegance",
    style: "Traditional floral design with gold accents",
    color: "from-amber-100 to-amber-50",
  },
  {
    id: 2,
    name: "Modern Minimal",
    style: "Clean and contemporary design",
    color: "from-slate-100 to-white",
  },
  {
    id: 3,
    name: "Royal Grandeur",
    style: "Luxurious royal theme with deep colors",
    color: "from-primary/20 to-primary/5",
  },
]

export default function InvitationsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(3)
  const [showPreview, setShowPreview] = useState(false)

  const eventDetails = {
    bride: "Priya",
    groom: "Rahul",
    date: "February 14, 2025",
    time: "7:00 PM onwards",
    venue: "Grand Palace Hall, Downtown City",
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Digital Invitations</h1>
          <p className="text-muted-foreground mt-1">Create and send beautiful wedding invitations</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Template Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Choose Template</h2>
            <div className="space-y-3">
              {invitationTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate === template.id ? "ring-2 ring-primary border-primary" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${template.color}`} />
                      <div>
                        <h3 className="font-semibold text-foreground">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.style}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Invitation Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Preview</h2>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? "Hide" : "Show"} Full Preview
              </Button>
            </div>

            <Card className="overflow-hidden">
              <div
                className={`bg-gradient-to-br ${
                  invitationTemplates.find((t) => t.id === selectedTemplate)?.color || "from-primary/20 to-primary/5"
                } p-6 md:p-8`}
              >
                <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">You are cordially invited to the wedding of</p>
                  <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                    {eventDetails.bride} & {eventDetails.groom}
                  </h3>

                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{eventDetails.date}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{eventDetails.time}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{eventDetails.venue}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground italic">
                      {'"Together with their families, they invite you to share in their joy"'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Send Invitations</CardTitle>
            <CardDescription>Share your invitation with guests via WhatsApp or download</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Send via WhatsApp
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download as Image
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Link
              </Button>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Quick Stats</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">150</p>
                  <p className="text-sm text-muted-foreground">Total Guests</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">98</p>
                  <p className="text-sm text-muted-foreground">Sent</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">52</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
