

import React from "react"

import { useState } from "react"

import { useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
import { Heart, Phone, Mail, Lock, ArrowRight, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { registerWithOTP, resendOTP, vertifyRegisterOTP } from "@/store/thunks/authThunks"
import { clearError } from "@/store/slices/authSlice"
import { useAppDispatch,useAppSelector } from "@/store/hooks"


export default function RegisterPage() {
  const navigate = useNavigate()
  const dispatch=useAppDispatch();

  //reading from redux
  const {loading,error,otpSent,pendingEmail}=useAppSelector((state)=>state.auth);

  const [step, setStep] = useState("details")
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    contactNo: "",
    email: "",
    OTP: "",
    password: "",
  })


  const handleChange=(e)=>{
    console.log(e);
    dispatch(clearError());
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSendOtp = async(e) => {
    e.preventDefault()
    const result=await dispatch(
      registerWithOTP({
        firstName:formData.firstName,
        lastName:formData.lastName,
        email:formData.email,
        password:formData.password,
        contactNo:formData.contactNo,
      })
    );
  
    if (registerWithOTP.fulfilled.match(result)) {
      setStep("otp")
    }
  }

  const handleVerifyOTP =async (e) => {
    e.preventDefault()
      const result=await dispatch(
        vertifyRegisterOTP({
          email:pendingEmail,
          OTP:formData.OTP,
        })
      );

      if (vertifyRegisterOTP.fulfilled.match(result)) {
      setStep("success")
      setTimeout(() => {
        navigate("/select-role")
      }, 1000)
    }
  }

  const handleResendOTP=async()=>{
    dispatch(clearError());
    await dispatch(resendOTP({email:pendingEmail,type:"register"}));
  }

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
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  step === "success" ? "bg-green-100" : "bg-primary/10"
                }`}
              >
                {step === "success" ? (
                  <Check className="h-8 w-8 text-green-600" />
                ) : (
                  <Heart className="h-8 w-8 text-primary" />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl">
              {step === "success" ? "Registration Complete!" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {step === "details" && "Enter your details to create an account"}
              {step === "otp" && `Enter the OTP sent to ${pendingEmail || "your email"}`}
              {step === "success" && "Redirecting to your dashboard..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "details" && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactNo">Mobile Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="contactNo"
                      id="contactNo"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.contactNo}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">FirstName *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="firstName"
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">LastName *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="lastName"
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                {
                  error && (
                    <p className="text-sm text-destructive text-center">{error}</p>
                  )
                }
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="otp"
                      name="OTP"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={formData.OTP}
                      onChange={(e) => {
                        dispatch(clearError())
                        setFormData({ ...formData,
                           OTP: e.target.value.replace(/\D/g, "").slice(0, 6) })}}
                      className="pl-10 text-center tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
                {
                  error && (
                    <p className="text-sm text-destructive text-center">{error}</p>
                  )
                }
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {
                    loading ? (
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    ) : (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )
                  }
                  {loading ? "Verifying OTP..." : "Verify & Register"}
                </Button>
                {/*Resend OTP*/ }
                
                <Button type="button" variant="ghost" className="w-full" onClick={handleResendOTP} disabled={loading}>
                  Resend OTP
                </Button>

                <Button type="button" variant="ghost" className="w-full" onClick={() => {
                  dispatch(clearError());
                  setStep("details")}}>
                  Change Details
                </Button>
              </form>
            )}

            {step === "success" && (
              <div className="text-center py-4">
                <div className="animate-pulse text-muted-foreground">Setting up your account...</div>
              </div>
            )}

            {step !== "success" && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Login
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
