
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TemplateShowcase } from "@/components/TemplateShowcase";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CtaSection } from "@/components/CtaSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TemplateShowcase />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
