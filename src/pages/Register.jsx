

import React from "react"

import { useState } from "react"

import { useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
import { Heart, Phone, Mail, Lock, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState("details")
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    otp: "",
    password: "",
  })

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (formData.phone.length >= 10) {
      setStep("otp")
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (formData.otp.length === 6) {
      setStep("success")
      setTimeout(() => {
        navigate("/select-role")
      }, 2000)
    }
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
              {step === "otp" && `Enter the OTP sent to ${formData.phone}`}
              {step === "success" && "Redirecting to your dashboard..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "details" && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Send OTP
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                      className="pl-10 text-center tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Verify & Register
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("details")}>
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
