"use client"

import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Save, Send, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const STEPS = [
  { id: 1, title: "Basic Info",  description: "Venue details"     },
  { id: 2, title: "Location",   description: "Address & contact"  },
  { id: 3, title: "Capacity",   description: "Infrastructure"     },
  { id: 4, title: "Facilities", description: "Amenities & docs"   },
]

const INITIAL_DATA = {
  step1: {
    venueName:  "",
    venueType:  "",
    venueOwner: "",
    isActive:   true,
    isVerified: false,
  },
  step2: {
    fullAddress:    "",
    city:           "",
    pincode:        "",
    googleMapLink:  "",
    ownerFullName:  "",
    managerName:    "",
    contactNumber:  "",
    emailAddress:   "",
    whatsappNumber: "",
  },
  step3: {
    totalRooms:      "",
    totalHalls:      "",
    totalLawns:      "",
    roomCapacity:    "",
    hallCapacity:    "",
    lawnCapacity:    "",
    parkingCapacity: "",
  },
  step4: {
    facilities:       [],
    foodType:         "",
    panNumber:        "",
    upiId:            "",
    fssaiCertificate: null,
    venueImages:      [],
    menuImages:       [],
  },
}

// ─────────────────────────────────────────────
// STEP INDICATOR
// ─────────────────────────────────────────────
const StepIndicator = ({ steps, currentStep, completedSteps }) => (
  <div className="flex items-center justify-between">
    {steps.map((step, index) => {
      const isCompleted = completedSteps.includes(step.id)
      const isCurrent   = currentStep === step.id
      return (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              isCompleted ? "bg-green-500 text-white"  :
              isCurrent   ? "bg-primary text-primary-foreground" :
                            "bg-muted text-muted-foreground"
            }`}>
              {isCompleted
                ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                : step.id
              }
            </div>
            <div className="text-center hidden sm:block">
              <p className={`text-xs font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 transition-colors ${isCompleted ? "bg-green-400" : "bg-border"}`} />
          )}
        </div>
      )
    })}
  </div>
)

// ─────────────────────────────────────────────
// STEP 1 — Basic Info
// ─────────────────────────────────────────────
const Step1BasicInfo = forwardRef(({ data }, ref) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ defaultValues: data })

  const isActive   = watch("isActive")
  const isVerified = watch("isVerified")

  useImperativeHandle(ref, () => ({
    triggerValidate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (validData) => resolve({ success: true,  data: validData }),
          ()           => resolve({ success: false })
        )()
      }),
  }))

  return (
    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-5">
      <h2 className="text-lg font-semibold">Step 1 — Basic Info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Venue Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Venue Name <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("venueName", { required: "Venue name is required" })}
            placeholder="e.g. Royal Banquet Hall"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
          {errors.venueName && <p className="text-red-500 text-xs mt-1">{errors.venueName.message}</p>}
        </div>

        {/* Venue Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Venue Type</label>
          <select
            {...register("venueType")}
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          >
            <option value="">Select type</option>
            <option value="banquet_hall">Banquet Hall</option>
            <option value="farmhouse">Farmhouse</option>
            <option value="hotel">Hotel</option>
            <option value="resort">Resort</option>
            <option value="outdoor_lawn">Outdoor Lawn</option>
            <option value="rooftop">Rooftop</option>
          </select>
        </div>

        {/* Venue Owner */}
        <div>
          <label className="block text-sm font-medium mb-1">Venue Owner</label>
          <input
            {...register("venueOwner")}
            placeholder="e.g. Ramesh Shah"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
        </div>
      </div>

      {/* isActive toggle */}
      <input type="hidden" {...register("isActive")} />
      <div>
        <label className="block text-sm font-medium mb-2">Status</label>
        <div className="flex gap-3">
          {["Active", "Inactive"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue("isActive", s === "Active")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                (s === "Active" ? isActive : !isActive)
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* isVerified checkbox */}
      <input type="hidden" {...register("isVerified")} />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setValue("isVerified", !isVerified)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isVerified ? "bg-primary border-primary" : "border-border"
          }`}
        >
          {isVerified && (
            <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <label className="text-sm">Mark as Verified Venue</label>
      </div>
    </div>
  )
})
Step1BasicInfo.displayName = "Step1BasicInfo"

// ─────────────────────────────────────────────
// STEP 2 — Location & Contact
// ─────────────────────────────────────────────
const Step2LocationContact = forwardRef(({ data }, ref) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data })

  useImperativeHandle(ref, () => ({
    triggerValidate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (validData) => resolve({ success: true,  data: validData }),
          ()           => resolve({ success: false })
        )()
      }),
  }))

  return (
    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-5">
      <h2 className="text-lg font-semibold">Step 2 — Location & Contact</h2>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Full Address <span className="text-blue-600">*</span>
        </label>
        <textarea
          rows={2}
          {...register("fullAddress", { required: "Full address is required" })}
          placeholder="Plot 12, Ring Road..."
          className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-3 text-sm outline-none resize-none"
        />
        {errors.fullAddress && <p className="text-red-500 text-xs mt-1">{errors.fullAddress.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            City <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("city", { required: "City is required" })}
            placeholder="e.g. Mumbai"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Pincode <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("pincode", {
              required: "Pincode is required",
              pattern: { value: /^[0-9]{6}$/, message: "Enter a valid 6-digit pincode" },
            })}
            placeholder="e.g. 400001"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
          {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Google Map Link</label>
          <input
            {...register("googleMapLink")}
            placeholder="https://maps.google.com/..."
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Owner Full Name <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("ownerFullName", { required: "Owner name is required" })}
            placeholder="e.g. Rajesh Kumar"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
          {errors.ownerFullName && <p className="text-red-500 text-xs mt-1">{errors.ownerFullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Manager Name</label>
          <input
            {...register("managerName")}
            placeholder="e.g. Sunil Verma"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Number <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("contactNumber", {
              required: "Contact number is required",
              pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
            })}
            placeholder="e.g. 9876543210"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
          {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
          <input
            {...register("whatsappNumber", {
              pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit number" },
            })}
            placeholder="e.g. 9876543210"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
          {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Email Address <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("emailAddress", {
              required: "Email address is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" },
            })}
            type="email"
            placeholder="venue@example.com"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
          {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress.message}</p>}
        </div>
      </div>
    </div>
  )
})
Step2LocationContact.displayName = "Step2LocationContact"

// ─────────────────────────────────────────────
// STEP 3 — Capacity & Infrastructure
// ─────────────────────────────────────────────
const Step3Capacity = forwardRef(({ data }, ref) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data })

  useImperativeHandle(ref, () => ({
    triggerValidate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (validData) => resolve({ success: true,  data: validData }),
          ()           => resolve({ success: false })
        )()
      }),
  }))

  const capacityFields = [
    { label: "Total Rooms",      name: "totalRooms",      placeholder: "e.g. 20"           },
    { label: "Total Halls",      name: "totalHalls",      placeholder: "e.g. 3"            },
    { label: "Total Lawns",      name: "totalLawns",      placeholder: "e.g. 2"            },
    { label: "Room Capacity",    name: "roomCapacity",    placeholder: "e.g. 50 guests"    },
    { label: "Hall Capacity",    name: "hallCapacity",    placeholder: "e.g. 500 guests"   },
    { label: "Lawn Capacity",    name: "lawnCapacity",    placeholder: "e.g. 1000 guests"  },
    { label: "Parking Capacity", name: "parkingCapacity", placeholder: "e.g. 200 vehicles" },
  ]

  return (
    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-5">
      <h2 className="text-lg font-semibold">Step 3 — Capacity & Infrastructure</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {capacityFields.map(({ label, name, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="number"
              {...register(name, { min: { value: 0, message: "Cannot be negative" } })}
              placeholder={placeholder}
              className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
          </div>
        ))}
      </div>
    </div>
  )
})
Step3Capacity.displayName = "Step3Capacity"

// ─────────────────────────────────────────────
// STEP 4 — Facilities & Documents
// ─────────────────────────────────────────────
const FACILITY_OPTIONS = [
  "Air Conditioning", "Parking", "Catering", "DJ / Sound System",
  "Stage", "Decoration", "Bridal Room", "Generator Backup",
  "CCTV", "Wi-Fi", "Valet Parking", "In-house Chef",
]

const FOOD_TYPES = ["Veg Only", "Non-Veg", "Both Veg & Non-Veg", "Jain Food Available"]

const Step4Facilities = forwardRef(({ data }, ref) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ defaultValues: data })

  const selectedFacilities = watch("facilities") ?? []
  const selectedFoodType   = watch("foodType")

  useImperativeHandle(ref, () => ({
    triggerValidate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (validData) => resolve({ success: true,  data: validData }),
          ()           => resolve({ success: false })
        )()
      }),
  }))

  const toggleFacility = (facility) => {
    const updated = selectedFacilities.includes(facility)
      ? selectedFacilities.filter((f) => f !== facility)
      : [...selectedFacilities, facility]
    setValue("facilities", updated)
  }

  const handleFileChange = (fieldName, files, multiple = false) => {
    setValue(fieldName, multiple ? Array.from(files) : files[0] ?? null)
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-6">
      <h2 className="text-lg font-semibold">Step 4 — Facilities & Documents</h2>

      {/* Facilities multi-select */}
      <input type="hidden" {...register("facilities")} />
      <div>
        <label className="block text-sm font-medium mb-2">Facilities Available</label>
        <div className="flex flex-wrap gap-2">
          {FACILITY_OPTIONS.map((facility) => (
            <button
              key={facility}
              type="button"
              onClick={() => toggleFacility(facility)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedFacilities.includes(facility)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted border border-border text-foreground hover:bg-muted/80"
              }`}
            >
              {facility}
            </button>
          ))}
        </div>
      </div>

      {/* Food Type */}
      <input type="hidden" {...register("foodType")} />
      <div>
        <label className="block text-sm font-medium mb-2">Food Type</label>
        <div className="flex flex-wrap gap-3">
          {FOOD_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setValue("foodType", type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFoodType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted border border-border text-foreground hover:bg-muted/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PAN Number */}
        <div>
          <label className="block text-sm font-medium mb-1">
            PAN Number <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("panNumber", {
              required: "PAN number is required",
              pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: "Enter a valid PAN (e.g. ABCDE1234F)" },
            })}
            placeholder="ABCDE1234F"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none uppercase"
          />
          {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber.message}</p>}
        </div>

        {/* UPI ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            UPI ID <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("upiId", { required: "UPI ID is required" })}
            placeholder="venue@upi"
            className="w-full bg-muted border border-transparent focus:border-primary rounded-lg px-4 py-2.5 text-sm outline-none"
          />
          {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId.message}</p>}
        </div>
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">FSSAI Certificate</label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => handleFileChange("fssaiCertificate", e.target.files)}
            className="w-full bg-muted border border-dashed border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-primary file:text-primary-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Venue Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange("venueImages", e.target.files, true)}
            className="w-full bg-muted border border-dashed border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-primary file:text-primary-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Menu Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange("menuImages", e.target.files, true)}
            className="w-full bg-muted border border-dashed border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-primary file:text-primary-foreground"
          />
        </div>
      </div>
    </div>
  )
})
Step4Facilities.displayName = "Step4Facilities"

// ─────────────────────────────────────────────
// MAIN — SetVenueProfile
// ─────────────────────────────────────────────
export default function SetVenueProfile() {
  const navigate = useNavigate()
  // import { useDispatch } from "react-redux"
  // const dispatch = useDispatch()

  const step1Ref = useRef(null)
  const step2Ref = useRef(null)
  const step3Ref = useRef(null)
  const step4Ref = useRef(null)
  const stepRefs = { 1: step1Ref, 2: step2Ref, 3: step3Ref, 4: step4Ref }

  const [currentStep,    setCurrentStep]    = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [collectedData,  setCollectedData]  = useState({})
  const [isSubmitting,   setIsSubmitting]   = useState(false)

  // Validate current step → collect data → advance
  const handleNext = async () => {
    const result = await stepRefs[currentStep].current.triggerValidate()
    if (!result.success) return

    setCollectedData((prev) => ({ ...prev, [`step${currentStep}`]: result.data }))
    setCompletedSteps((prev) => prev.includes(currentStep) ? prev : [...prev, currentStep])
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleSaveDraft = async () => {
    const result = await stepRefs[currentStep].current.triggerValidate()
    const draft = { ...collectedData, ...(result.data ? { [`step${currentStep}`]: result.data } : {}) }
    console.log("Saving draft:", draft)
    alert("Draft saved successfully!")
  }

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
      setCurrentStep(1)
      setCompletedSteps([])
      setCollectedData({})
      navigate("/select-role")
    }
  }

  // Final submit — validate last step then dispatch
  const handleSubmit = async () => {
    const result = await step4Ref.current.triggerValidate()
    if (!result.success) return

    const finalPayload = { ...collectedData, step4: result.data }
    console.log("Submitting venue →", finalPayload)

    setIsSubmitting(true)
    // dispatch(setVenueProfileThunk(finalPayload)) // 👈 uncomment your thunk
    await new Promise((r) => setTimeout(r, 1500))
    alert("Venue submitted successfully!")
    setIsSubmitting(false)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1BasicInfo       ref={step1Ref} data={INITIAL_DATA.step1} />
      case 2: return <Step2LocationContact ref={step2Ref} data={INITIAL_DATA.step2} />
      case 3: return <Step3Capacity        ref={step3Ref} data={INITIAL_DATA.step3} />
      case 4: return <Step4Facilities      ref={step4Ref} data={INITIAL_DATA.step4} />
      default: return null
    }
  }

  return (
    <div className="space-y-8 p-5">
      {/* Step Indicator */}
      <div className="bg-card rounded-xl border shadow-sm p-6">
        <StepIndicator steps={STEPS} currentStep={currentStep} completedSteps={completedSteps} />
      </div>

      {/* Step Content */}
      <div className="transition-all duration-300">{renderStep()}</div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card rounded-xl border shadow-sm p-6">
        {currentStep === 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto bg-transparent"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        ) : (
          <Button
            type="button"
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
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            className="w-full sm:w-auto bg-transparent"
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>

          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext} className="w-full sm:w-auto">
              Next Step
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
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
  )
}