import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import TrustedBy from "@/components/sections/trusted-by";
import Services from "@/components/sections/services";
import Features from "@/components/sections/features";
import Testimonials from "@/components/sections/testimonials";
import Newsletter from "@/components/sections/newsletter";
import CTA from "@/components/sections/cta";

export default function Home() {
  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Features />
        <Testimonials />
        <Newsletter />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
