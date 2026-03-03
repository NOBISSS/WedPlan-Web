"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Save, Send, X } from "lucide-react"
import { StepBasicInfo } from "@/components/set-venue-forms/step-basic-info"
import { StepLocationContact } from "@/components/set-venue-forms/step-location-contact"
import { StepCapacity } from "@/components/set-venue-forms/step-capacity"
import { StepFacilities } from "@/components/set-venue-forms/step-facilities"
import { StepIndicator } from "@/components/set-venue-forms/step-indicator"
import { useNavigate } from "react-router-dom"

const steps = [
  { id: 1, title: "Basic Info", description: "Venue details" },
  { id: 2, title: "Location", description: "Address & contact" },
  { id: 3, title: "Capacity", description: "Infrastructure" },
  { id: 4, title: "Facilities", description: "Amenities & docs" },
]

            // interface FormData {
            //   basicInfo: {
            //     venueName: string
            //     venueType: string
            //     venueOwner: string
            //     isActive: boolean
            //     isVerified: boolean
            //   }
            //   locationContact: {
            //     fullAddress: string
            //     city: string
            //     pincode: string
            //     googleMapLink: string
            //     ownerFullName: string
            //     managerName: string
            //     contactNumber: string
            //     emailAddress: string
            //     whatsappNumber: string
            //   }
            //   capacity: {
            //     totalRooms: string
            //     totalHalls: string
            //     totalLawns: string
            //     roomCapacity: string
            //     hallCapacity: string
            //     lawnCapacity: string
            //     parkingCapacity: string
            //   }
            //   facilities: {
            //     facilities: string[]
            //     foodType: string
            //     panNumber: string
            //     upiId: string
            //     fssaiCertificate: File | null
            //     venueImages: File[]
            //     menuImages: File[]
            //   }
            // }

const initialFormData = {
  basicInfo: {
    venueName: "",
    venueType: "",
    venueOwner: "",
    isActive: true,
    isVerified: false,
  },
  locationContact: {
    fullAddress: "",
    city: "",
    pincode: "",
    googleMapLink: "",
    ownerFullName: "",
    managerName: "",
    contactNumber: "",
    emailAddress: "",
    whatsappNumber: "",
  },
  capacity: {
    totalRooms: "",
    totalHalls: "",
    totalLawns: "",
    roomCapacity: "",
    hallCapacity: "",
    lawnCapacity: "",
    parkingCapacity: "",
  },
  facilities: {
    facilities: [],
    foodType: "",
    panNumber: "",
    upiId: "",
    fssaiCertificate: null,
    venueImages: [],
    menuImages: [],
  },
}

export default function SetVenueProfile() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.basicInfo.venueName.trim()) {
        newErrors.venueName = "Venue name is required"
      }
    }

    if (step === 2) {
      if (!formData.locationContact.fullAddress.trim()) {
        newErrors.fullAddress = "Full address is required"
      }
      if (!formData.locationContact.city.trim()) {
        newErrors.city = "City is required"
      }
      if (!formData.locationContact.pincode.trim()) {
        newErrors.pincode = "Pincode is required"
      }
      if (!formData.locationContact.ownerFullName.trim()) {
        newErrors.ownerFullName = "Owner name is required"
      }
      if (!formData.locationContact.contactNumber.trim()) {
        newErrors.contactNumber = "Contact number is required"
      }
      if (!formData.locationContact.emailAddress.trim()) {
        newErrors.emailAddress = "Email address is required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.locationContact.emailAddress)) {
        newErrors.emailAddress = "Please enter a valid email address"
      }
    }

    if (step === 4) {
      if (!formData.facilities.panNumber.trim()) {
        newErrors.panNumber = "PAN number is required"
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.facilities.panNumber)) {
        newErrors.panNumber = "Please enter a valid PAN number"
      }
      if (!formData.facilities.upiId.trim()) {
        newErrors.upiId = "UPI ID is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData)
    // Implement save draft logic
    alert("Draft saved successfully!")
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    console.log("Submitting venue:", formData)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    alert("Venue submitted successfully!")
    setIsSubmitting(false)
  }
  const handleCancel = () => {
    if (
      confirm(
        "Are you sure you want to cancel? All unsaved changes will be lost.",
      )
    ) {
      setFormData(initialFormData);
      setCurrentStep(1);
      // setCompletedSteps([]);
      // setIsDraft(false);
      setErrors({});
      navigate("/select-role");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepBasicInfo
            data={formData.basicInfo}
            onChange={(data) => setFormData({ ...formData, basicInfo: data })}
            errors={errors}
          />
        )
      case 2:
        return (
          <StepLocationContact
            data={formData.locationContact}
            onChange={(data) => setFormData({ ...formData, locationContact: data })}
            errors={errors}
          />
        )
      case 3:
        return (
          <StepCapacity
            data={formData.capacity}
            onChange={(data) => setFormData({ ...formData, capacity: data })}
          />
        )
      case 4:
        return (
          <StepFacilities
            data={formData.facilities}
            onChange={(data) => setFormData({ ...formData, facilities: data })}
            errors={errors}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8 p-5">
      {/* Step Indicator */}
      <div className="bg-card rounded-xl border shadow-sm p-6">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      {/* Form Content */}
      <div className="transition-all duration-300">{renderStep()}</div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card rounded-xl border shadow-sm p-6">
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

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="w-full sm:w-auto bg-transparent"
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>

          {currentStep < 4 ? (
            <Button onClick={handleNext} className="w-full sm:w-auto">
              Next Step
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Venue
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
