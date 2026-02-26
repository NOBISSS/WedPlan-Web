;

import { useState } from "react";
import {
  X,
  Search,
  LocateFixed,
  MousePointer2,
  DoorOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


// Data
const TABS = [
  { key: "quickFilters", label: "Quick Filters" },
  { key: "venueType", label: "Venue Type" },
  { key: "locations", label: "Locations" },
  { key: "availability", label: "Availability" },
  { key: "budget", label: "Budget" },
  { key: "capacity", label: "Capacity" },
  { key: "amenities", label: "Amenities" },
  { key: "eventType", label: "Event Type" },
  { key: "indoorOutdoor", label: "Indoor / Outdoor" },
];

const VENUE_TYPES = [
  "Banquet Hall",
  "Farm House",
  "Resort",
  "Hotel",
  "Convention Center",
  "Garden",
  "Beach Resort",
  "Rooftop",
  "Club",
  "Restaurant",
];

const LOCATIONS = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Goa",
];

const CAPACITY_OPTIONS = [
  "Upto 100",
  "100 - 200",
  "200 - 300",
  "300 - 500",
  "500 - 1000",
  "1000+",
];

const AMENITIES = [
  "Bar Service",
  "Dance Floor",
  "DJ",
  "Parking",
  "Valet Parking",
  "WiFi",
  "Projector",
  "Sound System",
  "Catering",
  "Decoration",
];

const EVENT_TYPES = [
  "Engagement Party",
  "Corporate Event",
  "Wedding Reception",
  "Birthday Party",
  "Anniversary",
  "Conference",
  "Exhibition",
  "Product Launch",
];

const INDOOR_OUTDOOR = [
  "AC Hall",
  "Non AC Hall",
  "Lawn",
  "Poolside",
  "Terrace",
  "Open Air",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DEFAULT_FILTER_STATE = {
  quickFilters: {
    quickApply: false,
    openToAll: false,
  },
  venueType: [],
  locations: [],
  availability: null,
  budget: {
    min: "",
    max: "",
  },
  capacity: [],
  amenities: [],
  eventType: [],
  indoorOutdoor: [],
};

export function VenueFilter({ isOpen, onClose, onApply }) {
  const [activeTab, setActiveTab] = useState("quickFilters");
  const [filters, setFilters] = useState(DEFAULT_FILTER_STATE);
  const [locationSearch, setLocationSearch] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const handleClearAll = () => {
    setFilters(DEFAULT_FILTER_STATE);
    setLocationSearch("");
  };

  const handleShowResult = () => {
    console.log("Applied Filters:", filters);
    onApply?.(filters);
    onClose();
  };

  const toggleQuickFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      quickFilters: {
        ...prev.quickFilters,
        [key]: !prev.quickFilters[key],
      },
    }));
  };

  const toggleArrayFilter = (
    filterKey,
    value
  ) => {
    setFilters((prev) => {
      const currentArray = prev[filterKey] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [filterKey]: newArray };
    });
  };

  const clearTabFilter = (filterKey) => {
    if (filterKey === "quickFilters") {
      setFilters((prev) => ({
        ...prev,
        quickFilters: { quickApply: false, openToAll: false },
      }));
    } else if (filterKey === "budget") {
      setFilters((prev) => ({
        ...prev,
        budget: { min: "", max: "" },
      }));
    } else if (filterKey === "availability") {
      setFilters((prev) => ({
        ...prev,
        availability: null,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: [],
      }));
    }
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(calendarYear, calendarMonth, day);
    setFilters((prev) => ({
      ...prev,
      availability: selectedDate,
    }));
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const filteredLocations = LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const years = Array.from({ length: 5 }, (_, i) => calendarYear - 2 + i);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "quickFilters":
        return (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => toggleQuickFilter("quickApply")}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                filters.quickFilters.quickApply
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <MousePointer2 className="h-5 w-5" />
              <span className="text-sm font-medium">Quick Apply</span>
            </button>
            <button
              type="button"
              onClick={() => toggleQuickFilter("openToAll")}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                filters.quickFilters.openToAll
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <DoorOpen className="h-5 w-5" />
              <span className="text-sm font-medium">Open to all</span>
            </button>
          </div>
        );

      case "venueType":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Selected</span>
              {filters.venueType.length > 0 && (
                <button
                  type="button"
                  onClick={() => clearTabFilter("venueType")}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear
                </button>
              )}
            </div>
            {filters.venueType.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.venueType.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                  >
                    {type}
                    <button
                      type="button"
                      onClick={() => toggleArrayFilter("venueType", type)}
                      className="ml-1 hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="space-y-1">
              {VENUE_TYPES.filter((t) => !filters.venueType.includes(t)).map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleArrayFilter("venueType", type)}
                    className="block w-full px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>
        );

      case "locations":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Select locations</span>
              {filters.locations.length > 0 && (
                <button
                  type="button"
                  onClick={() => clearTabFilter("locations")}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search locations"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <LocateFixed className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {filteredLocations.map((location) => (
                <label
                  key={location}
                  className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={filters.locations.includes(location)}
                    onChange={() => toggleArrayFilter("locations", location)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{location}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "availability":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <select
                value={calendarMonth}
                onChange={(e) => setCalendarMonth(Number(e.target.value))}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {MONTHS.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={calendarYear}
                onChange={(e) => setCalendarYear(Number(e.target.value))}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (calendarMonth === 0) {
                      setCalendarMonth(11);
                      setCalendarYear((y) => y - 1);
                    } else {
                      setCalendarMonth((m) => m - 1);
                    }
                  }}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                <span className="text-sm font-medium text-gray-700">
                  {MONTHS[calendarMonth]} {calendarYear}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (calendarMonth === 11) {
                      setCalendarMonth(0);
                      setCalendarYear((y) => y + 1);
                    } else {
                      setCalendarMonth((m) => m + 1);
                    }
                  }}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="py-1 text-xs font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
                {Array.from({
                  length: getFirstDayOfMonth(calendarMonth, calendarYear),
                }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({
                  length: getDaysInMonth(calendarMonth, calendarYear),
                }).map((_, i) => {
                  const day = i + 1;
                  const isSelected =
                    filters.availability &&
                    filters.availability.getDate() === day &&
                    filters.availability.getMonth() === calendarMonth &&
                    filters.availability.getFullYear() === calendarYear;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      className={`rounded py-1 text-sm transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "budget":
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-gray-600">
                Minimum Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="text"
                  placeholder="Enter Minimum"
                  value={filters.budget.min}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      budget: { ...prev.budget, min: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-gray-200 py-2 pl-8 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-600">
                Maximum Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="text"
                  placeholder="Enter Maximum"
                  value={filters.budget.max}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      budget: { ...prev.budget, max: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-gray-200 py-2 pl-8 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case "capacity":
        return (
          <div className="space-y-1">
            {CAPACITY_OPTIONS.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={filters.capacity.includes(option)}
                  onChange={() => toggleArrayFilter("capacity", option)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "amenities":
        return (
          <div className="space-y-1 max-h-72 overflow-y-auto">
            {AMENITIES.map((amenity) => (
              <label
                key={amenity}
                className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => toggleArrayFilter("amenities", amenity)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        );

      case "eventType":
        return (
          <div className="space-y-1 max-h-72 overflow-y-auto">
            {EVENT_TYPES.map((eventType) => (
              <label
                key={eventType}
                className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={filters.eventType.includes(eventType)}
                  onChange={() => toggleArrayFilter("eventType", eventType)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{eventType}</span>
              </label>
            ))}
          </div>
        );

      case "indoorOutdoor":
        return (
          <div className="space-y-1">
            {INDOOR_OUTDOOR.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={filters.indoorOutdoor.includes(option)}
                  onChange={() => toggleArrayFilter("indoorOutdoor", option)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">All Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 shrink-0 border-r border-gray-200 bg-gray-50">
            <nav className="py-2">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex w-full items-center px-4 py-3 text-left text-sm transition-colors ${
                    activeTab === tab.key
                      ? "bg-white font-medium text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {activeTab === tab.key && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
                  )}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={handleClearAll}
            className="text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={handleShowResult}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Show Result
          </button>
        </div>
      </div>
    </div>
  );
}
