import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Heart,Phone, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch } from "react-redux"
import { loginWithEmailOTP, verifyLoginOTP } from "@/store/thunks/authThunks"

export default function LoginPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState("contactNoOREmail")
  const [contactNoOREmail, setcontactNoOREmail] = useState("")
  const [otp, setOtp] = useState("")
  const dispatch=useDispatch();

  const handleSendOtp = (e) => {
    e.preventDefault()
    dispatch(loginWithEmailOTP(contactNoOREmail));  
    setStep("otp")
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (otp.length === 6) {
      dispatch(verifyLoginOTP(otp));
      if(localStorage.getItem("token")){
        navigate("/dashboard");
      }
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/dashboard");
    }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg text-foreground">WedPlan</span>
        </Link>
      </header>

      {/* Main content */}
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
              {step === "contactNoOREmail" ? "Enter your mobile number to login" : `Enter the OTP sent to ${contactNoOREmail}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "contactNoOREmail" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactNoOREmail">Email / Mobile No</Label>
                  <div className="relative">
                    {/* <contactNoOREmail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
                    <Input
                      id="contactNoOREmail"
                      type="text"
                      placeholder="Enter your mobile number or email"
                      value={contactNoOREmail}
                      onChange={(e) => setcontactNoOREmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Send OTP
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
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
                <Button type="submit" className="w-full" size="lg">
                  Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("contactNoOREmail")}>
                  Change Number
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
            <Link to="/forgotpassword" className="text-primary hover:underline font-medium">
                  Forgot Password ?
                </Link>
              <p className="text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Register
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
