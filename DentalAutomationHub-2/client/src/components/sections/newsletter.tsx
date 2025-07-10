import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertNewsletter } from "@shared/schema";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const newsletterMutation = useMutation({
    mutationFn: async (data: InsertNewsletter) => {
      return await apiRequest("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive our latest dental automation insights and tips.",
      });
      setEmail("");
      setFirstName("");
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: "Please check your email address and try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    newsletterMutation.mutate({ email, firstName: firstName || undefined });
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-teal-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Stay Ahead in Dental Innovation
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Get weekly insights on practice automation, patient engagement strategies, and the latest dental technology trends.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    type="text"
                    placeholder="First Name (Optional)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12"
                  />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold"
                  disabled={newsletterMutation.isPending}
                >
                  {newsletterMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Subscribe to Newsletter
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Join 1,200+ dental professionals. Unsubscribe anytime.
                </p>
              </form>

              <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Practice Tips</h3>
                  <p className="text-sm text-gray-600">Weekly automation strategies that actually work</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Industry Insights</h3>
                  <p className="text-sm text-gray-600">Latest trends and technology updates</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Exclusive Access</h3>
                  <p className="text-sm text-gray-600">Early access to new features and webinars</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}