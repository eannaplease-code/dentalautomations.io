import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "DentalAutomations.io has been pivotal in reducing our admin overhead by 50%. The WhatsApp integration alone has transformed how we communicate with patients.",
      author: "Dr. Sarah Chen",
      title: "Chen Family Dental",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      quote: "The HR onboarding automation saved us countless hours. New team members are fully trained and compliant within days instead of weeks.",
      author: "Maria Rodriguez",
      title: "Office Manager, Bright Smiles Dental",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      quote: "The ROI is incredible. We've increased our patient capacity by 25% without adding staff, thanks to the intelligent automation features.",
      author: "Dr. Michael Thompson",
      title: "Thompson Dental Group",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            What People Are Saying
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 scroll-reveal">
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
