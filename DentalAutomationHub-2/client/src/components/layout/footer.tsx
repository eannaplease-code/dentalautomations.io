import { useState } from "react";
import { Bot, Mail, Loader2 } from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertNewsletter } from "@shared/schema";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (data: InsertNewsletter) => {
      return await apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive our latest insights and updates.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Subscription Failed",
        description: "Please check your email and try again.",
        variant: "destructive",
      });
    }
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    newsletterMutation.mutate({ email });
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">DentalAutomations.io</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              The premier AI automation platform for dental practices. Streamline operations, reduce admin time, and focus on exceptional patient care.
            </p>

            {/* Quick Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-3">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 flex-1"
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700"
                  disabled={newsletterMutation.isPending}
                >
                  {newsletterMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>

            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center hover:bg-teal-700 transition-colors cursor-pointer">
                <FaLinkedin className="text-white text-sm" />
              </div>
              <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center hover:bg-teal-700 transition-colors cursor-pointer">
                <FaTwitter className="text-white text-sm" />
              </div>
              <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center hover:bg-teal-700 transition-colors cursor-pointer">
                <FaFacebook className="text-white text-sm" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">&copy; 2024 DentalAutomations.io. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-300 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
