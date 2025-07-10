import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, UserRound, TrendingUp } from "lucide-react";

export default function Features() {
  const phases = [
    {
      icon: CalendarCheck,
      title: "Before the Appointment",
      description: "Optimize your day before the first patient sits down",
      features: [
        {
          title: "Patient Portal Integration",
          description: "Automated form completion and pre-visit preparation"
        },
        {
          title: "Smart Scheduling",
          description: "AI-optimized appointment booking and confirmations"
        },
        {
          title: "Insurance Verification",
          description: "Automated benefits verification and eligibility checks"
        }
      ]
    },
    {
      icon: UserRound,
      title: "During the Appointment",
      description: "Streamline office efficiency with smart systems",
      features: [
        {
          title: "Real-time Updates",
          description: "Live patient status and treatment progress tracking"
        },
        {
          title: "Digital Forms",
          description: "Paperless consent and treatment plan management"
        },
        {
          title: "Team Communication",
          description: "Instant messaging and workflow coordination"
        }
      ]
    },
    {
      icon: TrendingUp,
      title: "After the Appointment",
      description: "Nothing falls through the cracks",
      features: [
        {
          title: "Automated Follow-ups",
          description: "Treatment care instructions and check-ins"
        },
        {
          title: "Payment Processing",
          description: "Streamlined billing and collection automation"
        },
        {
          title: "Review Requests",
          description: "Automated positive review generation"
        }
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-white/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Insight and tools to help your team with every step of the process
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {phases.map((phase, index) => {
            const IconComponent = phase.icon;
            const colors = [
              "from-teal-500 to-cyan-500",
              "from-green-500 to-emerald-500", 
              "from-blue-500 to-indigo-500"
            ];
            return (
              <div key={index} className="scroll-reveal">
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${colors[index]} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                  <p className="text-gray-600 text-lg">{phase.description}</p>
                </div>
                
                <div className="space-y-3">
                  {phase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer">
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                      <div className="mt-3">
                        <button className="inline-flex items-center text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors">
                          Learn more
                          <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
