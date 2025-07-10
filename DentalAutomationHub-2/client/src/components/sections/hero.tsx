import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Play, CheckCircle, TrendingUp } from "lucide-react";

export default function Hero() {
  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-nude-light to-muted">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-foreground">
            <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Feeling stretched thin by your practice?
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Grow your 
              <span className="text-transparent bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text"> dental practice</span>
              <br />with confidence
            </h1>
            
            <p className="text-xl mb-8 text-gray-600 leading-relaxed">
              DentalAutomations.io is the all-in-one practice automation software trusted by over 500 dental practices to streamline operations and deliver better patient care.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center px-3 py-1 bg-white/80 rounded-lg text-sm font-medium text-gray-700">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                HIPAA Compliant
              </div>
              <div className="flex items-center px-3 py-1 bg-white/80 rounded-lg text-sm font-medium text-gray-700">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                SOC 2 Type II
              </div>
              <div className="flex items-center px-3 py-1 bg-white/80 rounded-lg text-sm font-medium text-gray-700">
                ⭐⭐⭐⭐⭐ 4.9/5
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={scrollToDemo}
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start free trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
                onClick={scrollToDemo}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch a demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern dental office with automation technology" 
                className="rounded-2xl w-full h-auto"
              />
              
              {/* Floating achievement cards */}
              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-sm">50% Less Admin Time</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                <div className="flex items-center space-x-2 text-gray-700">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  <span className="font-semibold text-sm">25% More New Patients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
    </section>
  );
}
