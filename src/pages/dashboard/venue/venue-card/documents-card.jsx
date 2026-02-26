import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CreditCard, QrCode, ShieldCheck } from "lucide-react";
import { VenueDetail } from "../VenueDetail";


export function DocumentsCard({ details }) {
  const documents = [
    {
      icon: CreditCard,
      label: "PAN Number",
      value: details.PANNumber,
      masked: true,
    },
    {
      icon: QrCode,
      label: "UPI ID",
      value: details.UPIid,
      masked: false,
    },
    {
      icon: ShieldCheck,
      label: "FSSAI Certificate",
      value: details.FSSAICertificate,
      masked: true,
    },
  ];

  const maskValue = (value, show = 4) => {
    if (value.length <= show) return value;
    return "•".repeat(value.length - show) + value.slice(-show);
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Verification Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.label}
              className="flex items-center justify-between py-2 px-3 bg-secondary/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <doc.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{doc.label}</span>
              </div>
              <span className="text-sm font-mono text-foreground">
                {doc.masked ? maskValue(doc.value) : doc.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
