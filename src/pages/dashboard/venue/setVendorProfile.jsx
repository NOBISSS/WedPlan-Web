import { Step1BasicInfo } from "@/components/set-vendor-forms/step-1-basic-info";
import { Step2BusinessProfile } from "@/components/set-vendor-forms/step-2-business-profile";
import { Step3ServicesPricing } from "@/components/set-vendor-forms/step-3-services-pricing";
import { Step4MediaAvailability } from "@/components/set-vendor-forms/step-4-media-availability";
import { VendorStepIndicator } from "@/components/set-vendor-forms/vendor-step-indicator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save, Send, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  { id: 1, title: "Basic Info", description: "Vendor details" },
  { id: 2, title: "Business Profile", description: "Location & contact" },
  { id: 3, title: "Services", description: "Pricing & packages" },
  { id: 4, title: "Media", description: "Portfolio & availability" },
];

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// interface FormData {
//   step1: {
//     vendorName: string
//     vendorType: string
//     contactNumber: string
//     city: string
//     coverImage: File | null
//     coverImagePreview: string | null
//     status: string
//     isVerified: boolean
//   }
//   step2: {
//     businessName: string
//     description: string
//     yearsExperience: string
//     businessAddress: string
//     email: string
//     website: string
//     panNumber: string
//     upiId: string
//   }
//   step3: {
//     priceStart: string
//     discountPrice: string
//     priceUnit: string
//     services: Array<{
//       id: string
//       name: string
//       price: string
//       unit: string
//     }>
//   }
//   step4: {
//     portfolioImages: File[]
//     portfolioPreviews: string[]
//     availableDates: string[]
//     weeklyTimings: Array<{
//       day: string
//       isOpen: boolean
//       openTime: string
//       closeTime: string
//     }>
//     cancellationPolicy: string
//     restrictions: string
//     isAvailable: boolean
//   }
// }

const initialFormData = {
  step1: {
    vendorName: "",
    vendorType: "",
    contactNumber: "",
    city: "",
    coverImage: null,
    coverImagePreview: null,
    status: "Active",
    isVerified: false,
  },
  step2: {
    businessName: "",
    description: "",
    yearsExperience: "",
    businessAddress: "",
    email: "",
    website: "",
    panNumber: "",
    upiId: "",
  },
  step3: {
    priceStart: "",
    discountPrice: "",
    priceUnit: "",
    services: [{ id: "1", name: "", price: "", unit: "per_event" }],
  },
  step4: {
    portfolioImages: [],
    portfolioPreviews: [],
    availableDates: [],
    weeklyTimings: DAYS_OF_WEEK.map((day) => ({
      day,
      isOpen: day !== "Sunday",
      openTime: "09:00",
      closeTime: "21:00",
    })),
    cancellationPolicy: "",
    restrictions: "",
    isAvailable: true,
  },
};

function SetVendorProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const navigate = useNavigate();

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.step1.vendorName.trim()) {
        newErrors.vendorName = "Vendor name is required";
      }
      if (!formData.step1.vendorType) {
        newErrors.vendorType = "Vendor type is required";
      }
      if (!formData.step1.contactNumber.trim()) {
        newErrors.contactNumber = "Contact number is required";
      }
      if (!formData.step1.city.trim()) {
        newErrors.city = "City is required";
      }
    }

    if (step === 2) {
      if (
        formData.step2.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.step2.email)
      ) {
        newErrors.email = "Please enter a valid email address";
      }
      if (
        formData.step2.panNumber &&
        !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.step2.panNumber)
      ) {
        newErrors.panNumber = "Please enter a valid PAN number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    if (validateStep(currentStep)) {
      setIsDraft(true);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      console.log("Saving draft:", formData);

      // Move to next step if not on last step
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        alert("Draft saved successfully!");
      }
    }
  };

  const handleSaveAndContinue = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setIsDraft(true);

      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCancel = () => {
    if (
      confirm(
        "Are you sure you want to cancel? All unsaved changes will be lost.",
      )
    ) {
      setFormData(initialFormData);
      setCurrentStep(1);
      setCompletedSteps([]);
      setIsDraft(false);
      setErrors({});
      navigate("/select-role");
    }
  };

  const handleFinalSave = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    console.log("Final submission:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Vendor saved successfully!");
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            data={formData.step1}
            onChange={(data) => setFormData({ ...formData, step1: data })}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2BusinessProfile
            data={formData.step2}
            onChange={(data) => setFormData({ ...formData, step2: data })}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3ServicesPricing
            data={formData.step3}
            onChange={(data) => setFormData({ ...formData, step3: data })}
            errors={errors}
          />
        );
      case 4:
        return (
          <Step4MediaAvailability
            data={formData.step4}
            onChange={(data) => setFormData({ ...formData, step4: data })}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 p-5">
      {/* Step Indicator */}
      <div className="bg-card rounded-xl border shadow-sm p-6">
        <VendorStepIndicator
          steps={STEPS}
          currentStep={currentStep}
          completedSteps={completedSteps}
          isDraft={isDraft}
        />
      </div>

      {/* Form Content */}
      <div className="transition-all duration-300">{renderStep()}</div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card rounded-xl border shadow-sm p-6">
        <div className="flex gap-3 w-full sm:w-auto">
          {currentStep === 1 ? (
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleBack}
              className="w-full sm:w-auto bg-transparent"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {currentStep === 1 ? (
            <Button onClick={handleSaveDraft} className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          ) : currentStep < 4 ? (
            <Button
              onClick={handleSaveAndContinue}
              className="w-full sm:w-auto"
            >
              Save & Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleFinalSave}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Final Save Vendor
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SetVendorProfile;