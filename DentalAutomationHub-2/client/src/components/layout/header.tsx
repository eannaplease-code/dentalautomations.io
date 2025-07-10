import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bot } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleSignIn = () => {
    window.location.href = "/api/login";
  };

  const handleDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <>
      {/* Top Banner */}
      <div className="gradient-primary text-white py-3 px-4 text-center text-sm">
        <div className="container mx-auto">
          <span className="font-medium">🚀 Automate your dental practice and reduce admin time by 50% —</span>
          <button 
            onClick={() => scrollToSection('demo')}
            className="ml-2 underline hover:no-underline font-semibold text-white"
          >
            Schedule your free demo now
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">DentalAutomations.io</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('resources')}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Resources
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  className="hidden md:inline-flex"
                  onClick={handleDashboard}
                >
                  Dashboard
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  className="hidden md:inline-flex"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              )}
              <Button 
                className="bg-accent hover:bg-accent/90"
                onClick={() => scrollToSection('demo')}
              >
                Start Free Trial
              </Button>
              
              {/* Mobile menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-8">
                    <button 
                      onClick={() => scrollToSection('features')}
                      className="text-left text-foreground hover:text-primary transition-colors"
                    >
                      Features
                    </button>
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="text-left text-foreground hover:text-primary transition-colors"
                    >
                      Services
                    </button>
                    <button 
                      onClick={() => scrollToSection('pricing')}
                      className="text-left text-foreground hover:text-primary transition-colors"
                    >
                      Pricing
                    </button>
                    <button 
                      onClick={() => scrollToSection('resources')}
                      className="text-left text-foreground hover:text-primary transition-colors"
                    >
                      Resources
                    </button>
                    {isAuthenticated ? (
                      <Button variant="ghost" onClick={handleDashboard}>
                        Dashboard
                      </Button>
                    ) : (
                      <Button variant="ghost" onClick={handleSignIn}>
                        Sign In
                      </Button>
                    )}
                    <Button 
                      className="bg-accent hover:bg-accent/90"
                      onClick={() => scrollToSection('demo')}
                    >
                      Start Free Trial
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
