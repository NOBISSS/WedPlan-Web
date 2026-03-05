import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Heart, Lock, ArrowRight, Eye, EyeOff, KeyRound, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch } from "react-redux"
import { loginWithEmailOTP, verifyLoginOTP, loginWithPassword } from "@/store/thunks/authThunks"

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // "otp" | "password"
  const [loginMode, setLoginMode] = useState("otp")

  // OTP flow
  const [otpStep, setOtpStep] = useState("contact") // "contact" | "otp"
  const [contactNoOREmail, setContactNoOREmail] = useState("")
  const [otp, setOtp] = useState("")

  // Password flow
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSendOtp = (e) => {
    e.preventDefault()
    dispatch(loginWithEmailOTP(contactNoOREmail))
    setOtpStep("otp")
  }

  const handleOtpLogin = (e) => {
    e.preventDefault()
    if (otp.length === 6) {
      dispatch(verifyLoginOTP(otp))
      if (localStorage.getItem("token")) {
        navigate("/dashboard")
      }
    }
  }

  const handlePasswordLogin = (e) => {
    e.preventDefault()
    dispatch(loginWithPassword({ email, password,navigate }))
    if (localStorage.getItem("token").length > 0) {
      //navigate("/dashboard")
    }
  }

  // reset OTP step when switching mode
  const switchMode = (mode) => {
    setLoginMode(mode)
    setOtpStep("contact")
    setOtp("")
    setContactNoOREmail("")
    setEmail("")
    setPassword("")
  }

  useEffect(() => {
    if (localStorage.getItem("token")?.length > 0) {
     //navigate("/dashboard")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg text-foreground">WedPlan</span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              {loginMode === "otp"
                ? otpStep === "contact"
                  ? "Enter your email or mobile to receive an OTP"
                  : `Enter the OTP sent to ${contactNoOREmail}`
                : "Sign in with your email and password"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* ── Mode Toggle ── */}
            <div className="flex rounded-lg border border-border p-1 gap-1">
              <button
                type="button"
                onClick={() => switchMode("otp")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  loginMode === "otp"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                OTP Login
              </button>
              <button
                type="button"
                onClick={() => switchMode("password")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  loginMode === "password"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <KeyRound className="h-3.5 w-3.5" />
                Password Login
              </button>
            </div>

            {/* ── OTP Flow ── */}
            {loginMode === "otp" && (
              <>
                {otpStep === "contact" ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactNoOREmail">Email / Mobile No</Label>
                      <Input
                        id="contactNoOREmail"
                        type="text"
                        placeholder="Enter your email or mobile number"
                        value={contactNoOREmail}
                        onChange={(e) => setContactNoOREmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Send OTP
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          className="pl-10 text-center tracking-widest"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={otp.length !== 6}>
                      Verify & Login
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => setOtpStep("contact")}
                    >
                      Change Number / Email
                    </Button>
                  </form>
                )}
              </>
            )}

            {/* ── Password Flow ── */}
            {loginMode === "password" && (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgotpassword"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {/* ── Footer ── */}
            <p className="text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Register
              </Link>
            </p>

          </CardContent>
        </Card>
      </main>
    </div>
  )
}