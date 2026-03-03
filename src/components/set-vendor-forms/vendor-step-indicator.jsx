import { Check, FileEdit } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// interface Step {
//   id: number
//   title: string
//   description: string
// }

// interface VendorStepIndicatorProps {
//   steps: Step[]
//   currentStep: number
//   completedSteps: number[]
//   isDraft?: boolean
// }

export function VendorStepIndicator({
  steps,
  currentStep,
  completedSteps,
  isDraft = false,
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
          {isDraft && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <FileEdit className="h-3 w-3" />
              Draft
            </Badge>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = currentStep === step.id
          const isAccessible = step.id === 1 || completedSteps.includes(step.id - 1)

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary bg-primary/10 text-primary"
                        : isAccessible
                          ? "border-muted-foreground/30 bg-background text-muted-foreground"
                          : "border-muted/50 bg-muted/20 text-muted-foreground/50"
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div className="mt-2 text-center hidden sm:block">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent || isCompleted
                        ? "text-foreground"
                        : isAccessible
                          ? "text-muted-foreground"
                          : "text-muted-foreground/50"
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 max-w-30">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 sm:mx-4 transition-colors duration-300",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
