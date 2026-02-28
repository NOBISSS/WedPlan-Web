import { useNavigate } from "react-router-dom"

export default function SelectRole() {        // ← fix component name too
  const navigate = useNavigate()              // ← move here, top level

  const handleContinue = (role) => {          // ← simplified, no need for e
    if (role === "venue") {
      navigate("/vendor/onboard")
    } else if (role === "user") {
      navigate("/dashboard")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Select Your Role</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handleContinue("venue")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Venue Owner
        </button>
        <button
          onClick={() => handleContinue("user")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          User
        </button>
      </div>
    </div>
  )
}