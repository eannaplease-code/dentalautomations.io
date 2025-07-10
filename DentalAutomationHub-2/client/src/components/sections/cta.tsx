import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rocket, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertDemoRequest } from "@shared/schema";

export default function CTA() {
  const [formData, setFormData] = useState<Partial<InsertDemoRequest>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    practiceName: "",
    practiceSize: "",
    currentSoftware: "",
    primaryChallenge: "",
    preferredContactTime: "",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const demoMutation = useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      return await apiRequest("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your personalized demo.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        practiceName: "",
        practiceSize: "",
        currentSoftware: "",
        primaryChallenge: "",
        preferredContactTime: "",
        message: ""
      });
      queryClient.invalidateQueries({ queryKey: ["/api/demo-requests"] });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }
    demoMutation.mutate(formData as InsertDemoRequest);
  };

  const handleInputChange = (field: keyof InsertDemoRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { value: "50%", label: "Reduction in admin time" },
    { value: "25%", label: "Increase in patient capacity" },
    { value: "99.9%", label: "System uptime reliability" }
  ];

  return (
    <section id="demo" className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Practice Smarter.™
            </h2>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Not using DentalAutomations yet? Schedule a demo and start intelligently shaping the future of your practice today.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Demo Request Form */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Calendar className="mr-3 h-6 w-6 text-teal-600" />
                  Schedule Your Free Demo
                </CardTitle>
                <p className="text-gray-600">See how DentalAutomations can transform your practice in just 15 minutes.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName || ""}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName || ""}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="practiceName">Practice Name</Label>
                      <Input
                        id="practiceName"
                        value={formData.practiceName || ""}
                        onChange={(e) => handleInputChange("practiceName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="practiceSize">Practice Size</Label>
                      <Select value={formData.practiceSize || ""} onValueChange={(value) => handleInputChange("practiceSize", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 employees</SelectItem>
                          <SelectItem value="6-15">6-15 employees</SelectItem>
                          <SelectItem value="16-50">16-50 employees</SelectItem>
                          <SelectItem value="50+">50+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currentSoftware">Current Software</Label>
                      <Input
                        id="currentSoftware"
                        value={formData.currentSoftware || ""}
                        onChange={(e) => handleInputChange("currentSoftware", e.target.value)}
                        placeholder="e.g., Dentrix, Eaglesoft"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="primaryChallenge">Primary Challenge</Label>
                    <Select value={formData.primaryChallenge || ""} onValueChange={(value) => handleInputChange("primaryChallenge", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="What's your biggest challenge?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient-communication">Patient Communication</SelectItem>
                        <SelectItem value="scheduling">Scheduling & Appointments</SelectItem>
                        <SelectItem value="billing">Billing & Insurance</SelectItem>
                        <SelectItem value="hr-onboarding">HR & Staff Onboarding</SelectItem>
                        <SelectItem value="patient-acquisition">New Patient Acquisition</SelectItem>
                        <SelectItem value="administrative-tasks">Administrative Tasks</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="preferredContactTime">Preferred Contact Time</Label>
                    <Select value={formData.preferredContactTime || ""} onValueChange={(value) => handleInputChange("preferredContactTime", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="When should we call?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                        <SelectItem value="evening">Evening (5 PM - 7 PM)</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message || ""}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us more about your practice needs..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white" 
                    disabled={demoMutation.isPending}
                  >
                    {demoMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-4 w-4" />
                        Schedule My Demo
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Stats and Benefits */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Why 500+ Practices Choose Us</h3>
                <p className="text-teal-100 mb-6">
                  Experience dentistry's only all-in-one practice performance solution, with industry-leading analytics, patient engagement, online scheduling, payments, insurance management, and so much more.
                </p>
              </div>

              <div className="grid gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <h3 className="text-3xl font-bold mb-2 text-white">{stat.value}</h3>
                    <p className="text-teal-100">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">What You'll See in Your Demo:</h4>
                <ul className="space-y-2 text-teal-100">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    WhatsApp AI assistant in action
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    Automated patient notifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    HR onboarding workflows
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    Invoice scanning & processing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
