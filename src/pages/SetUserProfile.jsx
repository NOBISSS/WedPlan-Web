import React, { useState } from "react";

const SetUserProfile = () => {
  const [gender, setGender] = useState("male");

  return (
    <div className="min-h-screen p-4 flex justify-center items-center font-sans">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-8 md:p-10 shadow-2xl relative">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Create Your Profile
          </h1>
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500 mb-2">
              Profile Photo (Optional)
            </span>
            <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden border-2 border-transparent shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=200&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Row 1: Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                defaultValue="Keshur"
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Middle Name{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                defaultValue="Dev"
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                defaultValue="Hareshbhai"
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Row 2: Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                defaultValue="India"
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                State <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                defaultValue="Gujarat"
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                City <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                defaultValue="Ahmedabad"
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Row 3: Codes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                City Code <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                defaultValue="Ahmedabad"
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                State Code <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                defaultValue="Gujarat"
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Country Code <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                defaultValue="91"
                className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Row 4: Address */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              Address{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows="2"
              defaultValue="47/826 SHIVANAND NAGAR Near Satyam Nagar NAGARWEL Hanumanroad AMRAIWAD"
              className="w-full bg-[#EDF3FF] border border-transparent focus:border-blue-400 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none resize-none"
            ></textarea>
          </div>

          {/* Row 5: Gender */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-2">
              Gender <span className="text-blue-600">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${gender === "male" ? "bg-[#1a5cff] text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${gender === "female" ? "bg-[#1a5cff] text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                Female
              </button>
              <button
                type="button"
                onClick={() => setGender("other")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${gender === "other" ? "bg-[#1a5cff] text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                Other
              </button>
            </div>
          </div>

          {/* Row 6: Date of Birth */}
          <div className="md:w-1/3">
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              Date of Birth{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue="01/04/2006"
                className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none pr-10"
              />
            </div>
          </div>
          {/* <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink-0 mx-4 text-gray-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div> */}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#1a5cff] hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg transition-colors shadow-sm"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetUserProfile;
