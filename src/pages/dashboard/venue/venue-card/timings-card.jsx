import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function TimingsCard({ operations }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Operating Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {dayOrder.map((day) => {
            const timing = operations.weeklyTimings[day];
            const isToday = day === today;

            return (
              <div
                key={day}
                className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                  isToday ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/50"
                }`}
              >
                <span
                  className={`text-sm ${
                    isToday ? "font-semibold text-primary" : "text-foreground"
                  }`}
                >
                  {day}
                  {isToday && (
                    <span className="ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                      Today
                    </span>
                  )}
                </span>
                <span
                  className={`text-sm ${
                    timing?.isOpen
                      ? isToday
                        ? "font-medium text-primary"
                        : "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {timing?.isOpen
                    ? `${timing.openTime} - ${timing.closeTime}`
                    : "Closed"}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
