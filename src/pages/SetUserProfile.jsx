import { setUserProfile } from "@/store/thunks/authThunks";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";


const SetUserProfile = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,           // needed for gender (controlled via buttons)
    watch,              // to watch gender value for active button styling
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      country: "",
      state: "",
      city: "",
      cityCode: "",
      stateCode: "",
      countryCode: "",
      address: "",
      gender: "male",   // default gender
      dateOfBirth: "",
      accountType: "user",
    },
  });

  // Watch gender to apply active styling on buttons
  const selectedGender = watch("gender");

  const onSubmit = (data) => {
    console.log("Form Data →", data); // clean object ready for your thunk
    dispatch(setUserProfile(data));
  };

  return (
    <div className="min-h-screen p-4 flex justify-center items-center font-sans">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-8 md:p-10 shadow-2xl relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Your Profile</h1>
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500 mb-2">Profile Photo (Optional)</span>
            <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden border-2 border-transparent shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=200&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Row 1: Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Middle Name <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                {...register("middleName")}
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Row 2: Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Country", name: "country" },
              { label: "State",   name: "state"   },
              { label: "City",    name: "city"    },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                  {label} <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  {...register(name, { required: `${label} is required` })}
                  className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
                />
                {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
              </div>
            ))}
          </div>

          {/* Row 3: Codes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "City Code",    name: "cityCode"    },
              { label: "State Code",   name: "stateCode"   },
              { label: "Country Code", name: "countryCode" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                  {label} <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  {...register(name, { required: `${label} is required` })}
                  className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
                />
                {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
              </div>
            ))}
          </div>

          {/* Row 4: Address */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows="2"
              {...register("address")}
              className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none resize-none"
            />
          </div>

          {/* Row 5: Gender — uses setValue instead of register directly */}
          <div>
            {/* 👇 Hidden input so gender is registered in the form */}
            <input type="hidden" {...register("gender", { required: "Gender is required" })} />
            <label className="block text-left text-sm font-medium text-gray-700 mb-2">
              Gender <span className="text-blue-600">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {["male", "female", "other"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setValue("gender", option)}  // 👈 setValue updates the hidden input
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                    selectedGender === option
                      ? "bg-[#1a5cff] text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>

          {/* Row 6: Date of Birth */}
          <div className="md:w-1/3">
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1a5cff] hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg transition-colors shadow-sm disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SetUserProfile;