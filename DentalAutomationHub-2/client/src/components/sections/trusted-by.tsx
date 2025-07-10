export default function TrustedBy() {
  const logos = [
    "Dental Excellence Group",
    "SmileCare Partners", 
    "Urban Dental Studios",
    "Family First Dentistry",
    "Modern Oral Health",
    "Premier Dental Network",
    "Bright Futures Dental",
    "Coastal Dental Group",
    "Metropolitan Dental",
    "Advanced Dental Care",
    "Wellness Dental Partners",
    "Elite Dental Services"
  ];

  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            Trusted by thousands of dental and wellness professionals across the globe
          </h3>
        </div>
        
        {/* Infinite scroll animation */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...logos, ...logos].map((name, index) => (
              <div key={index} className="flex-shrink-0 mx-8 flex items-center justify-center min-w-[200px]">
                <div className="text-gray-400 font-medium text-sm tracking-wide">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
