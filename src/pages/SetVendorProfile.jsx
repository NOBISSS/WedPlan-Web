import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { setVendorProfileThunk } from "@/store/thunks/vendorThunk"; // 👈 uncomment your thunk

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const STEPS = [
  { id: 1, title: "Basic Info",        description: "Vendor details"        },
  { id: 2, title: "Business Profile",  description: "Location & contact"    },
  { id: 3, title: "Services",          description: "Pricing & packages"    },
  { id: 4, title: "Media",             description: "Portfolio & availability" },
];

const DAYS_OF_WEEK = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const INITIAL_DATA = {
  step1: { vendorName: "", vendorType: "", contactNumber: "", city: "", status: "Active", isVerified: false },
  step2: { businessName: "", description: "", yearsExperience: "", businessAddress: "", email: "", website: "", panNumber: "", upiId: "" },
  step3: { priceStart: "", discountPrice: "", priceUnit: "per_event", services: [{ id: "1", name: "", price: "", unit: "per_event" }] },
  step4: {
    availableDates: [],
    weeklyTimings: DAYS_OF_WEEK.map((day) => ({ day, isOpen: day !== "Sunday", openTime: "09:00", closeTime: "21:00" })),
    cancellationPolicy: "",
    restrictions: "",
    isAvailable: true,
  },
};

// ─────────────────────────────────────────────
// STEP 1 — Basic Info
// ─────────────────────────────────────────────
const Step1BasicInfo = forwardRef(({ data }, ref) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ defaultValues: data });

  const selectedStatus = watch("status");
  const isVerified     = watch("isVerified");

  useImperativeHandle(ref, () => ({
    triggerValidate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (validData) => resolve({ success: true,  data: validData }),
          ()           => resolve({ success: false })
        )();
      }),
  }));

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">Step 1 — Basic Info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendor Name <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("vendorName", { required: "Vendor name is required" })}
            placeholder="e.g. Royal Events"
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          />
          {errors.vendorName && <p className="text-red-500 text-xs mt-1">{errors.vendorName.message}</p>}
        </div> */}

        {/* Vendor Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendor Type <span className="text-blue-600">*</span>
          </label>
          <select
            {...register("type", { required: "Vendor type is required" })}
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          >
            <option value="">Select type</option>
            <option value="photographer">Photographer</option>
            <option value="caterer">Caterer</option>
            <option value="decorator">Decorator</option>
            <option value="venue">Venue</option>
            <option value="music">Music / DJ</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
        </div>

          {/* Row 2: Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Country", name: "country",placeholder:"e.g. India" },
              { label: "State",   name: "state",placeholder:"e.g. Maharashtra"   },
              { label: "City",    name: "city",placeholder:"e.g. Mumbai"    },
            ].map(({ label, name,placeholder }) => (
              <div key={name}>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                  {label} <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  {...register(name, { required: `${label} is required` })}
                  className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
                  placeholder={placeholder}
                />
                {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
              </div>
            ))}
          </div>
      </div>

      {/* Status — button toggle using setValue + watch */}
      <input type="hidden" {...register("status")} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <div className="flex gap-3">
          {["Active", "Inactive"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue("status", s)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === s ? "bg-[#1a5cff] text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* isVerified — checkbox */}
      <input type="hidden" {...register("isVerified")} />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setValue("isVerified", !isVerified)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isVerified ? "bg-[#1a5cff] border-[#1a5cff]" : "border-gray-300"
          }`}
        >
          {isVerified && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </button>
        <label className="text-sm text-gray-700">Mark as Verified Vendor</label>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// STEP 2 — Business Profile
// ─────────────────────────────────────────────
const Step2BusinessProfile = forwardRef(({ data }, ref) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data });

  useImperativeHandle(ref, () => ({
    triggerValidate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (validData) => resolve({ success: true,  data: validData }),
          ()           => resolve({ success: false })
        )();
      }),
  }));

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">Step 2 — Business Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
          <input
            {...register("businessName")}
            placeholder="Official business name"
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
          <input
            {...register("yearsExperience", {
              min: { value: 0, message: "Cannot be negative" },
            })}
            type="number"
            placeholder="e.g. 5"
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          />
          {errors.yearsExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsExperience.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register("email", {
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
            })}
            type="email"
            placeholder="vendor@example.com"
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input
            {...register("website")}
            placeholder="https://yourwebsite.com"
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
          <input
            {...register("panNumber", {
              pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: "Enter a valid PAN (e.g. ABCDE1234F)" },
            })}
            placeholder="ABCDE1234F"
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          />
          {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
          <input
            {...register("upiId")}
            placeholder="vendor@upi"
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
        <textarea
          rows={2}
          {...register("businessAddress")}
          placeholder="Full business address"
          className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          rows={3}
          {...register("description", {
            maxLength: { value: 500, message: "Max 500 characters" },
          })}
          placeholder="Describe your business..."
          className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none resize-none"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// STEP 3 — Services & Pricing
// ─────────────────────────────────────────────
const Step3ServicesPricing = forwardRef(({ data }, ref) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ defaultValues: data });

  const services = watch("services");

  useImperativeHandle(ref, () => ({
    triggerValidate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (validData) => resolve({ success: true,  data: validData }),
          ()           => resolve({ success: false })
        )();
      }),
  }));

  const addService = () => {
    setValue("services", [
      ...services,
      { id: Date.now().toString(), name: "", price: "", unit: "per_event" },
    ]);
  };

  const removeService = (index) => {
    setValue("services", services.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">Step 3 — Services & Pricing</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Starting Price <span className="text-blue-600">*</span>
          </label>
          <input
            {...register("priceStart", { required: "Starting price is required" })}
            type="number"
            placeholder="₹ 5000"
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          />
          {errors.priceStart && <p className="text-red-500 text-xs mt-1">{errors.priceStart.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price</label>
          <input
            {...register("discountPrice")}
            type="number"
            placeholder="₹ 4000"
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Unit</label>
          <select
            {...register("priceUnit")}
            className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
          >
            <option value="per_event">Per Event</option>
            <option value="per_hour">Per Hour</option>
            <option value="per_day">Per Day</option>
            <option value="per_person">Per Person</option>
          </select>
        </div>
      </div>

      {/* Dynamic Services */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Services / Packages</label>
          <button
            type="button"
            onClick={addService}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            + Add Service
          </button>
        </div>

        {services.map((service, index) => (
          <div key={service.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-[#EDF3FF] rounded-lg relative">
            <input
              {...register(`services.${index}.name`, { required: "Service name required" })}
              placeholder="Service name"
              className="bg-white border border-transparent focus:border-blue-400 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <input
              {...register(`services.${index}.price`, { required: "Price required" })}
              type="number"
              placeholder="Price ₹"
              className="bg-white border border-transparent focus:border-blue-400 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <div className="flex gap-2">
              <select
                {...register(`services.${index}.unit`)}
                className="flex-1 bg-white border border-transparent focus:border-blue-400 rounded-lg px-3 py-2 text-sm outline-none"
              >
                <option value="per_event">Per Event</option>
                <option value="per_hour">Per Hour</option>
                <option value="per_day">Per Day</option>
              </select>
              {services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-400 hover:text-red-600 px-2 font-bold text-lg"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// STEP 4 — Media & Availability
// ─────────────────────────────────────────────
const Step4MediaAvailability = forwardRef(({ data }, ref) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ defaultValues: data });

  const weeklyTimings = watch("weeklyTimings");
  const isAvailable   = watch("isAvailable");

  useImperativeHandle(ref, () => ({
    triggerValidate: () =>
      new Promise((resolve) => {
        handleSubmit(
          (validData) => resolve({ success: true,  data: validData }),
          ()           => resolve({ success: false })
        )();
      }),
  }));

  const toggleDay = (index) => {
    const updated = weeklyTimings.map((t, i) =>
      i === index ? { ...t, isOpen: !t.isOpen } : t
    );
    setValue("weeklyTimings", updated);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">Step 4 — Media & Availability</h2>

      {/* isAvailable toggle */}
      <input type="hidden" {...register("isAvailable")} />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setValue("isAvailable", !isAvailable)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAvailable ? "bg-[#1a5cff]" : "bg-gray-300"}`}
        >
          <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${isAvailable ? "translate-x-6" : "translate-x-1"}`} />
        </button>
        <span className="text-sm text-gray-700 font-medium">Currently Available for Bookings</span>
      </div>

      {/* Weekly Timings */}
      <input type="hidden" {...register("weeklyTimings")} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Weekly Timings</label>
        <div className="space-y-2">
          {weeklyTimings.map((timing, index) => (
            <div key={timing.day} className="flex items-center gap-3 p-3 bg-[#EDF3FF] rounded-lg">
              <button
                type="button"
                onClick={() => toggleDay(index)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  timing.isOpen ? "bg-[#1a5cff] border-[#1a5cff]" : "border-gray-300 bg-white"
                }`}
              >
                {timing.isOpen && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </button>
              <span className="text-sm font-medium text-gray-700 w-24">{timing.day}</span>
              {timing.isOpen ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={timing.openTime}
                    onChange={(e) => {
                      const updated = weeklyTimings.map((t, i) => i === index ? { ...t, openTime: e.target.value } : t);
                      setValue("weeklyTimings", updated);
                    }}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none"
                  />
                  <span className="text-gray-400 text-sm">to</span>
                  <input
                    type="time"
                    value={timing.closeTime}
                    onChange={(e) => {
                      const updated = weeklyTimings.map((t, i) => i === index ? { ...t, closeTime: e.target.value } : t);
                      setValue("weeklyTimings", updated);
                    }}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none"
                  />
                </div>
              ) : (
                <span className="text-sm text-gray-400 italic">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cancellation Policy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
        <textarea
          rows={2}
          {...register("cancellationPolicy")}
          placeholder="e.g. Full refund if cancelled 7 days prior..."
          className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none resize-none"
        />
      </div>

      {/* Restrictions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Restrictions</label>
        <textarea
          rows={2}
          {...register("restrictions")}
          placeholder="e.g. No alcohol events, outdoor only..."
          className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none resize-none"
        />
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// STEP INDICATOR
// ─────────────────────────────────────────────
const VendorStepIndicator = ({ steps, currentStep, completedSteps }) => (
  <div className="flex items-center justify-between">
    {steps.map((step, index) => {
      const isCompleted = completedSteps.includes(step.id);
      const isCurrent   = currentStep === step.id;
      return (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              isCompleted ? "bg-green-500 text-white" :
              isCurrent   ? "bg-[#1a5cff] text-white" :
                            "bg-gray-100 text-gray-400"
            }`}>
              {isCompleted
                ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                : step.id
              }
            </div>
            <div className="text-center hidden sm:block">
              <p className={`text-xs font-medium ${isCurrent ? "text-[#1a5cff]" : "text-gray-500"}`}>{step.title}</p>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 transition-colors ${isCompleted ? "bg-green-400" : "bg-gray-200"}`} />
          )}
        </div>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────
// MAIN — SetVendorProfile
// ─────────────────────────────────────────────
function SetVendorProfile() {
  const dispatch = useDispatch();

  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const stepRefs = { 1: step1Ref, 2: step2Ref, 3: step3Ref, 4: step4Ref };

  const [currentStep,    setCurrentStep]    = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [collectedData,  setCollectedData]  = useState({});
  const [isSubmitting,   setIsSubmitting]   = useState(false);

  // ── Validate current step → collect data → advance
  const handleNext = async () => {
    const result = await stepRefs[currentStep].current.triggerValidate();
    if (!result.success) return; // errors shown inside the step

    setCollectedData((prev) => ({ ...prev, [`step${currentStep}`]: result.data }));
    setCompletedSteps((prev) => prev.includes(currentStep) ? prev : [...prev, currentStep]);
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleCancel = () => {
    if (confirm("Cancel setup? All unsaved changes will be lost.")) {
      setCurrentStep(1);
      setCompletedSteps([]);
      setCollectedData({});
    }
  };

  // ── Final submit — validate last step then dispatch thunk
  const handleFinalSave = async () => {
    const result = await step4Ref.current.triggerValidate();
    if (!result.success) return;

    const finalPayload = {
      ...collectedData,
      step4: result.data, // always take step4 fresh from validation
    };

    console.log("Dispatching vendor profile →", finalPayload);

    setIsSubmitting(true);
    // dispatch(setVendorProfileThunk(finalPayload)); // 👈 uncomment your thunk
    await new Promise((r) => setTimeout(r, 1200)); // remove this line when using real thunk
    alert("Vendor profile saved!");
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1BasicInfo           ref={step1Ref} data={INITIAL_DATA.step1} />;
      case 2: return <Step2BusinessProfile     ref={step2Ref} data={INITIAL_DATA.step2} />;
      case 3: return <Step3ServicesPricing     ref={step3Ref} data={INITIAL_DATA.step3} />;
      case 4: return <Step4MediaAvailability   ref={step4Ref} data={INITIAL_DATA.step4} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 p-5 min-h-screen bg-gray-50">

      {/* Step Indicator */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <VendorStepIndicator
          steps={STEPS}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>

      {/* Step Content */}
      <div className="transition-all duration-300">{renderStep()}</div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border shadow-sm p-6">

        {/* Left: Cancel / Back */}
        <div className="flex gap-3 w-full sm:w-auto">
          {currentStep === 1 ? (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white"
            >
              ✕ Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white"
            >
              ← Back
            </button>
          )}
        </div>

        {/* Right: Next / Final Save */}
        <div className="flex gap-3 w-full sm:w-auto">
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1a5cff] text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Save & Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSave}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1a5cff] text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                "✓ Final Save Vendor"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SetVendorProfile;