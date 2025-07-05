"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  MessageSquare,
  Sparkles,
  Building2,
  TrendingUp,
  Users,
  Globe,
  Zap,
  BarChart3,
  Target,
  Crown,
  Shield,
  RefreshCw,
  ArrowRight,
  Award,
  Briefcase,
  MapPin,
  Activity,
  Layers,
  Lightbulb,
  PieChart,
  LineChart,
  CheckCircle,
  Clock,
  Rocket,
  Database,
  Brain,
  Search,
  Heart,
  Cpu,
  Settings,
} from "lucide-react"

interface BusinessData {
  rating: number
  reviews: number
  headline: string
}

interface AnalyzedBusiness {
  name: string
  location: string
  data: BusinessData
}

export default function Dashboard() {
  const [businessName, setBusinessName] = useState("")
  const [location, setLocation] = useState("")
  const [analyzedBusiness, setAnalyzedBusiness] = useState<AnalyzedBusiness | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; location?: string }>({})

  const validateForm = () => {
    const newErrors: { name?: string; location?: string } = {}

    if (!businessName.trim()) {
      newErrors.name = "Business name is required"
    }

    if (!location.trim()) {
      newErrors.location = "Location is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/business-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: businessName,
          location: location,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch business data")
      }

      const data = await response.json()

      // Set the business data first
      setAnalyzedBusiness({
        name: businessName,
        location: location,
        data: data,
      })

      // Then trigger the flip animation
      setTimeout(() => {
        setIsFlipped(true)
      }, 100)
    } catch (error) {
      console.error("Error fetching business data:", error)
      alert("Failed to fetch business data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerateHeadline = async () => {
    if (!analyzedBusiness) return

    setIsRegenerating(true)

    try {
      const response = await fetch(
        `/api/regenerate-headline?name=${encodeURIComponent(analyzedBusiness.name)}&location=${encodeURIComponent(analyzedBusiness.location)}`,
      )

      if (!response.ok) {
        throw new Error("Failed to regenerate headline")
      }

      const data = await response.json()
      setAnalyzedBusiness((prev) =>
        prev
          ? {
              ...prev,
              data: { ...prev.data, headline: data.headline },
            }
          : null,
      )
    } catch (error) {
      console.error("Error regenerating headline:", error)
      alert("Failed to regenerate headline. Please try again.")
    } finally {
      setIsRegenerating(false)
    }
  }

  const resetAnalysis = () => {
    setBusinessName("")
    setLocation("")
    setAnalyzedBusiness(null)
    setIsFlipped(false)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/50 via-transparent to-purple-900/50"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-full blur-3xl"></div>

        {/* Geometric shapes */}
        <div className="absolute top-32 left-1/4 w-4 h-4 bg-emerald-400/30 rotate-45 rounded-sm"></div>
        <div className="absolute top-64 right-1/3 w-6 h-6 bg-teal-400/30 rounded-full"></div>
        <div className="absolute bottom-48 left-1/3 w-3 h-3 bg-cyan-400/30 rotate-45"></div>
        <div className="absolute bottom-32 right-1/4 w-5 h-5 bg-emerald-500/20 rounded-full"></div>
      </div>

      <div className="relative z-10 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Modern Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-xl">
                  <Briefcase className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  BusinessIQ
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    Professional Suite
                  </Badge>
                  <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50">
                    <Activity className="h-3 w-3 mr-1" />
                    Live Analytics
                  </Badge>
                </div>
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4">
                Advanced Business Intelligence Platform
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Unlock powerful insights with AI-driven analytics, comprehensive market analysis, and intelligent
                content generation for your business growth
              </p>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Users,
                label: "Businesses Analyzed",
                value: "25K+",
                color: "from-emerald-500 to-teal-500",
                bg: "from-emerald-50 to-teal-50",
              },
              {
                icon: TrendingUp,
                label: "Average Growth",
                value: "180%",
                color: "from-teal-500 to-cyan-500",
                bg: "from-teal-50 to-cyan-50",
              },
              {
                icon: Globe,
                label: "Global Markets",
                value: "150+",
                color: "from-cyan-500 to-blue-500",
                bg: "from-cyan-50 to-blue-50",
              },
              {
                icon: Target,
                label: "Success Rate",
                value: "99.2%",
                color: "from-blue-500 to-indigo-500",
                bg: "from-blue-50 to-indigo-50",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${stat.bg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4 shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Enhanced Input Form with More Content */}
            <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader className="pb-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-4 text-gray-800">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                    <Layers className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Business Analysis Center</h3>
                    <p className="text-sm text-gray-600 font-normal mt-1">Configure your business intelligence scan</p>
                  </div>
                  <Badge className="ml-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    AI Enhanced
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <Label
                      htmlFor="businessName"
                      className="text-gray-700 font-semibold text-base flex items-center gap-2"
                    >
                      <Building2 className="h-4 w-4 text-emerald-600" />
                      Business Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="businessName"
                        type="text"
                        placeholder="Enter your business name (e.g., Green Valley Cafe, TechFlow Solutions)"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className={`h-14 text-base bg-gray-50/50 border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl pl-4 pr-12 transition-all duration-300 ${
                          errors.name ? "border-red-400 focus:border-red-500" : ""
                        }`}
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Building2 className="h-5 w-5 text-emerald-600" />
                        </div>
                      </div>
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="location" className="text-gray-700 font-semibold text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-teal-600" />
                      Business Location
                    </Label>
                    <div className="relative">
                      <Input
                        id="location"
                        type="text"
                        placeholder="Enter your location (e.g., San Francisco, London, Tokyo)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`h-14 text-base bg-gray-50/50 border-2 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl pl-4 pr-12 transition-all duration-300 ${
                          errors.location ? "border-red-400 focus:border-red-500" : ""
                        }`}
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <MapPin className="h-5 w-5 text-teal-600" />
                        </div>
                      </div>
                    </div>
                    {errors.location && (
                      <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-16 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
                        <span>Analyzing Business Intelligence...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <PieChart className="h-6 w-6" />
                        <span>Generate Business Insights</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Enhanced Feature Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                  {[
                    { icon: Star, text: "Rating Analysis", color: "text-yellow-600", bg: "bg-yellow-50" },
                    { icon: MessageSquare, text: "Review Intelligence", color: "text-blue-600", bg: "bg-blue-50" },
                    { icon: Sparkles, text: "AI Content Gen", color: "text-purple-600", bg: "bg-purple-50" },
                    { icon: LineChart, text: "Growth Metrics", color: "text-green-600", bg: "bg-green-50" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-4 ${feature.bg} rounded-xl border border-gray-100`}
                    >
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                      <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* AI Processing Pipeline */}
                <div className="space-y-6 pt-8 border-t border-gray-200">
                  <h4 className="text-gray-800 font-bold text-lg flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    AI Processing Pipeline
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Search,
                        title: "Data Collection",
                        description: "Gather comprehensive business data from multiple sources",
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                        border: "border-blue-200",
                      },
                      {
                        icon: Cpu,
                        title: "AI Analysis",
                        description: "Advanced machine learning algorithms process your data",
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                        border: "border-purple-200",
                      },
                      {
                        icon: Lightbulb,
                        title: "Insight Generation",
                        description: "Generate actionable insights and recommendations",
                        color: "text-orange-600",
                        bg: "bg-orange-50",
                        border: "border-orange-200",
                      },
                      {
                        icon: Rocket,
                        title: "Growth Strategy",
                        description: "Receive personalized growth strategies and content",
                        color: "text-green-600",
                        bg: "bg-green-50",
                        border: "border-green-200",
                      },
                    ].map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-4 p-4 ${step.bg} rounded-xl border-2 ${step.border} hover:shadow-md transition-all duration-300`}
                      >
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <step.icon className={`h-5 w-5 ${step.color}`} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-1">{step.title}</h5>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform Benefits */}
                <div className="space-y-6 pt-8 border-t border-gray-200">
                  <h4 className="text-gray-800 font-bold text-lg flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                      <Crown className="h-5 w-5 text-white" />
                    </div>
                    Premium Features
                  </h4>
                  <div className="space-y-3">
                    {[
                      { icon: Zap, text: "Real-time AI processing with advanced algorithms", color: "text-yellow-600" },
                      { icon: Shield, text: "Enterprise-grade security and data protection", color: "text-blue-600" },
                      { icon: TrendingUp, text: "Comprehensive market intelligence reports", color: "text-green-600" },
                      { icon: Globe, text: "Global business database and insights", color: "text-purple-600" },
                      { icon: Database, text: "Advanced data analytics and visualization", color: "text-cyan-600" },
                      { icon: Settings, text: "Customizable reporting and automation", color: "text-orange-600" },
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
                      >
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                        </div>
                        <span className="text-sm font-medium text-gray-700 leading-relaxed">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success Metrics */}
                <div className="space-y-6 pt-8 border-t border-gray-200">
                  <h4 className="text-gray-800 font-bold text-lg flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    Success Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Accuracy Rate", value: "99.7%", icon: CheckCircle, color: "text-green-600" },
                      { label: "Processing Speed", value: "<2s", icon: Clock, color: "text-blue-600" },
                      { label: "Data Sources", value: "500+", icon: Database, color: "text-purple-600" },
                      { label: "Client Satisfaction", value: "4.9/5", icon: Heart, color: "text-red-600" },
                    ].map((metric, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 shadow-sm"
                      >
                        <div className="flex justify-center mb-2">
                          <metric.icon className={`h-6 w-6 ${metric.color}`} />
                        </div>
                        <div className={`text-xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                        <div className="text-xs font-medium text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset Button - Only show when results exist */}
                {analyzedBusiness && (
                  <div className="pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 rounded-xl bg-transparent"
                      onClick={resetAnalysis}
                    >
                      <RefreshCw className="h-5 w-5 mr-3" />
                      Start New Analysis
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Results Display with Proper Flip Animation */}
            <div className="relative h-full perspective-1000">
              <div
                className={`relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Card - Analysis Ready */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <Card className="bg-white/90 backdrop-blur-xl border-2 border-dashed border-slate-400 hover:border-slate-300 transition-all duration-300 shadow-lg h-full">
                    <CardHeader className="pb-6">
                      <CardTitle className="flex items-center gap-4 text-gray-700">
                        <div className="p-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl">
                          <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Analysis Ready</h3>
                          <p className="text-sm text-gray-500 font-normal mt-1">
                            Your detailed report will appear here
                          </p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <div className="text-center py-12">
                        <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-8 inline-block shadow-lg">
                          <PieChart className="h-16 w-16 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Analytics Awaiting</h3>
                        <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                          Complete the form to generate comprehensive business intelligence with AI-powered insights and
                          recommendations
                        </p>
                      </div>

                      {/* Preview Features */}
                      <div className="space-y-6 pt-6 border-t-2 border-gray-200">
                        <h4 className="text-gray-800 font-bold text-lg flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          Report Includes
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {[
                            {
                              icon: Star,
                              text: "Comprehensive rating and review analysis",
                              color: "text-yellow-600",
                              bg: "bg-yellow-50",
                              border: "border-yellow-200",
                            },
                            {
                              icon: MessageSquare,
                              text: "Customer sentiment and feedback insights",
                              color: "text-blue-600",
                              bg: "bg-blue-50",
                              border: "border-blue-200",
                            },
                            {
                              icon: Sparkles,
                              text: "AI-generated marketing headlines and content",
                              color: "text-purple-600",
                              bg: "bg-purple-50",
                              border: "border-purple-200",
                            },
                            {
                              icon: TrendingUp,
                              text: "Market position and competitive analysis",
                              color: "text-green-600",
                              bg: "bg-green-50",
                              border: "border-green-200",
                            },
                          ].map((feature, index) => (
                            <div
                              key={index}
                              className={`flex items-center gap-4 p-5 ${feature.bg} rounded-xl border-2 ${feature.border} shadow-md`}
                            >
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                              </div>
                              <span className="text-base font-medium text-gray-700">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sample Metrics */}
                      <div className="space-y-6 pt-8 border-t-2 border-gray-200">
                        <h4 className="text-gray-800 font-bold text-lg flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                            <BarChart3 className="h-5 w-5 text-white" />
                          </div>
                          Sample Analytics
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: "SEO Score", value: "---", color: "text-gray-400" },
                            { label: "Visibility", value: "---", color: "text-gray-400" },
                            { label: "Growth", value: "---", color: "text-gray-400" },
                          ].map((metric, index) => (
                            <div
                              key={index}
                              className="text-center p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 opacity-60"
                            >
                              <div className={`text-2xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                              <div className="text-sm font-semibold text-gray-500">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Back Card - Intelligence Report */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                  {analyzedBusiness && (
                    <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 h-full">
                      <CardHeader className="pb-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-4 text-gray-800">
                            <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg">
                              <BarChart3 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">Intelligence Report</h3>
                              <p className="text-sm text-gray-600 font-normal mt-1">Comprehensive business analysis</p>
                            </div>
                          </CardTitle>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2">
                            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                            Active Report
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-4 p-4 bg-white/60 rounded-xl">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Building2 className="h-5 w-5 text-emerald-600" />
                            <span className="font-semibold text-lg">{analyzedBusiness.name}</span>
                          </div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="h-5 w-5 text-teal-600" />
                            <span className="font-medium">{analyzedBusiness.location}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                        {/* Enhanced Business Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative group">
                            <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 shadow-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg">
                                  <Star className="h-5 w-5 text-white" />
                                </div>
                                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
                                  Outstanding
                                </Badge>
                              </div>
                              <div className="text-3xl font-bold text-gray-800 mb-1">
                                {analyzedBusiness.data.rating}
                              </div>
                              <div className="text-xs font-semibold text-gray-600 mb-2">Google Business Rating</div>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(analyzedBusiness.data.rating)
                                        ? "text-yellow-500 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="relative group">
                            <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                                  <MessageSquare className="h-5 w-5 text-white" />
                                </div>
                                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 text-xs">
                                  Engaged
                                </Badge>
                              </div>
                              <div className="text-3xl font-bold text-gray-800 mb-1">
                                {analyzedBusiness.data.reviews}
                              </div>
                              <div className="text-xs font-semibold text-gray-600 mb-2">Customer Reviews</div>
                              <div className="text-xs text-blue-600 font-medium">+18% growth this quarter</div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced SEO Headline Section */}
                        <div className="space-y-4 pt-4 border-t-2 border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                              <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-800">AI-Generated Marketing Headline</h3>
                              <p className="text-sm text-gray-600">
                                Optimized for maximum engagement and SEO performance
                              </p>
                            </div>
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1">
                              <Lightbulb className="h-3 w-3 mr-1" />
                              AI Optimized
                            </Badge>
                          </div>

                          <div className="relative group">
                            <div className="relative bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-xl border-2 border-l-4 border-l-amber-400 border-slate-300 hover:border-slate-400 transition-all duration-300 shadow-lg">
                              <div className="flex items-start gap-3">
                                <div className="p-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-1 shadow-lg">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <p className="text-slate-900 font-bold leading-relaxed text-xl drop-shadow-sm">
                                  {analyzedBusiness.data.headline}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Button
                            onClick={handleRegenerateHeadline}
                            className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
                            disabled={isRegenerating}
                          >
                            {isRegenerating ? (
                              <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                <span>Generating New Headline...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <Sparkles className="h-5 w-5" />
                                <span>Generate New SEO Headline</span>
                                <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                  <div
                                    className="w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                  <div
                                    className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"
                                    style={{ animationDelay: "0.4s" }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </Button>
                        </div>

                        {/* Enhanced Performance Insights */}
                        <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                          <h4 className="text-gray-800 font-bold text-lg flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                              <BarChart3 className="h-4 w-4 text-white" />
                            </div>
                            Performance Analytics
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              {
                                label: "SEO Score",
                                value: "96/100",
                                color: "text-green-600",
                                bg: "from-green-50 to-emerald-50",
                                border: "border-green-200",
                              },
                              {
                                label: "Market Visibility",
                                value: "Excellent",
                                color: "text-blue-600",
                                bg: "from-blue-50 to-cyan-50",
                                border: "border-blue-200",
                              },
                              {
                                label: "Growth Rate",
                                value: "+28%",
                                color: "text-purple-600",
                                bg: "from-purple-50 to-pink-50",
                                border: "border-purple-200",
                              },
                            ].map((metric, index) => (
                              <div
                                key={index}
                                className={`text-center p-4 bg-gradient-to-br ${metric.bg} rounded-xl border-2 ${metric.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                              >
                                <div className={`text-xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                                <div className="text-xs font-semibold text-gray-600">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced Market Position */}
                        <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                          <h4 className="text-gray-800 font-bold text-lg flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                              <Target className="h-4 w-4 text-white" />
                            </div>
                            Market Intelligence
                          </h4>
                          <div className="space-y-3">
                            {[
                              {
                                label: "Competitive Advantage",
                                status: "Strong Leadership",
                                color: "text-green-600",
                                bg: "bg-green-50",
                                border: "border-green-200",
                              },
                              {
                                label: "Brand Recognition",
                                status: "Rapidly Growing",
                                color: "text-blue-600",
                                bg: "bg-blue-50",
                                border: "border-blue-200",
                              },
                              {
                                label: "Customer Loyalty",
                                status: "Exceptional",
                                color: "text-purple-600",
                                bg: "bg-purple-50",
                                border: "border-purple-200",
                              },
                              {
                                label: "Market Share",
                                status: "Expanding Territory",
                                color: "text-orange-600",
                                bg: "bg-orange-50",
                                border: "border-orange-200",
                              },
                            ].map((item, index) => (
                              <div
                                key={index}
                                className={`flex items-center justify-between p-4 ${item.bg} rounded-xl border-2 ${item.border} shadow-md hover:shadow-lg transition-all duration-300`}
                              >
                                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                                <span
                                  className={`text-sm font-bold ${item.color} px-2 py-1 bg-white rounded-lg shadow-sm`}
                                >
                                  {item.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Additional Insights */}
                        <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                          <h4 className="text-gray-800 font-bold text-lg flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                              <Lightbulb className="h-4 w-4 text-white" />
                            </div>
                            Key Recommendations
                          </h4>
                          <div className="space-y-3">
                            {[
                              {
                                icon: TrendingUp,
                                text: "Leverage high rating for premium positioning strategy",
                                color: "text-green-600",
                                bg: "bg-green-50",
                              },
                              {
                                icon: Users,
                                text: "Expand customer engagement through social media",
                                color: "text-blue-600",
                                bg: "bg-blue-50",
                              },
                              {
                                icon: Globe,
                                text: "Consider market expansion to neighboring areas",
                                color: "text-purple-600",
                                bg: "bg-purple-50",
                              },
                            ].map((rec, index) => (
                              <div
                                key={index}
                                className={`flex items-start gap-3 p-4 ${rec.bg} rounded-xl border border-gray-200 shadow-sm`}
                              >
                                <div className="p-1 bg-white rounded-lg shadow-sm mt-0.5">
                                  <rec.icon className={`h-4 w-4 ${rec.color}`} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 leading-relaxed">{rec.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Competitive Analysis */}
                        <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                          <h4 className="text-gray-800 font-bold text-lg flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                              <Target className="h-4 w-4 text-white" />
                            </div>
                            Competitive Analysis
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              {
                                metric: "Market Position",
                                value: "#2 in Local Market",
                                trend: "+3 positions",
                                color: "text-green-600",
                                bg: "bg-green-50",
                                border: "border-green-200",
                              },
                              {
                                metric: "Price Competitiveness",
                                value: "15% Above Average",
                                trend: "Premium positioning",
                                color: "text-blue-600",
                                bg: "bg-blue-50",
                                border: "border-blue-200",
                              },
                              {
                                metric: "Service Quality",
                                value: "Top 10%",
                                trend: "Industry leading",
                                color: "text-purple-600",
                                bg: "bg-purple-50",
                                border: "border-purple-200",
                              },
                              {
                                metric: "Online Presence",
                                value: "Strong",
                                trend: "+45% visibility",
                                color: "text-orange-600",
                                bg: "bg-orange-50",
                                border: "border-orange-200",
                              },
                            ].map((item, index) => (
                              <div
                                key={index}
                                className={`p-4 ${item.bg} rounded-xl border-2 ${item.border} shadow-md hover:shadow-lg transition-all duration-300`}
                              >
                                <div className="text-sm font-semibold text-gray-700 mb-1">{item.metric}</div>
                                <div className={`text-lg font-bold ${item.color} mb-1`}>{item.value}</div>
                                <div className="text-xs text-gray-600">{item.trend}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="text-center mt-20 pb-12">
            <div className="flex items-center justify-center gap-8 mb-8">
              {[
                { icon: Shield, text: "Bank-Level Security", color: "text-emerald-400" },
                { icon: Zap, text: "Lightning Fast AI", color: "text-teal-400" },
                { icon: Globe, text: "Global Intelligence", color: "text-cyan-400" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-blue-200">
                  <div className="p-2 bg-gradient-to-r from-blue-800 to-indigo-800 rounded-lg border border-blue-700">
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
            <p className="text-blue-300 text-base">
              © 2024 BusinessIQ - Transforming Business Intelligence with Advanced AI Technology
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
