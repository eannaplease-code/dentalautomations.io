import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Bell, Users, FileText, Check } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: MessageCircle,
      title: "WhatsApp & Instagram AI Assistants",
      description: "24/7 intelligent patient communication across popular messaging platforms. Handle appointment scheduling, FAQs, and patient inquiries automatically.",
      features: [
        "Automated appointment booking",
        "Instant FAQ responses",
        "Multi-language support"
      ]
    },
    {
      icon: Bell,
      title: "Smart Notification Systems",
      description: "Intelligent patient reminders, confirmations, and follow-ups that reduce no-shows by up to 40% while improving patient satisfaction.",
      features: [
        "Appointment reminders",
        "Treatment follow-ups",
        "Payment notifications"
      ]
    },
    {
      icon: Users,
      title: "HR Onboarding Automation",
      description: "Streamline new employee onboarding with automated document collection, training schedules, and compliance tracking.",
      features: [
        "Digital document signing",
        "Training automation",
        "Compliance monitoring"
      ]
    },
    {
      icon: FileText,
      title: "Invoice Scanning & CRM Integration",
      description: "AI-powered invoice processing with seamless CRM integration. Automate data entry and financial tracking for improved accuracy.",
      features: [
        "OCR document scanning",
        "Automated data entry",
        "Real-time CRM sync"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Tools to scale your practice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We go above and beyond the expected features so you have all the right tools working together to scale your business, practice smarter, and elevate every patient interaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const colors = [
              "from-teal-500 to-cyan-600",
              "from-green-500 to-emerald-600", 
              "from-blue-500 to-indigo-600",
              "from-purple-500 to-violet-600"
            ];
            return (
              <Card key={index} className="card-depth bg-white/80 backdrop-blur-sm border-0 overflow-hidden scroll-reveal">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${colors[index]} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <button className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
                      Learn more
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
