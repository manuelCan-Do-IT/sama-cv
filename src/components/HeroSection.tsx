
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const floatingElements = [
  { text: "education", class: "top-[15%] left-[15%] rotate-[-5deg]" },
  { text: "experience", class: "top-[25%] right-[18%] rotate-[5deg]" },
  { text: "skills", class: "bottom-[35%] left-[22%] rotate-[3deg]" },
  { text: "languages", class: "bottom-[28%] right-[12%] rotate-[-3deg]" },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="absolute inset-0 bg-[url('/assets/pattern-bg.svg')] opacity-10" />
      
      {/* Floating Elements with Improved Layout */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className={`absolute hidden md:block transform ${element.class}`}
          style={{
            animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.2}s`
          }}
        >
          <div className="card-glass px-6 py-3 text-base font-medium bg-primary/10 text-primary border border-primary/20 rounded-xl shadow-lg backdrop-blur-sm">
            {t(`builder.${element.text}`)}
          </div>
        </div>
      ))}

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              {t("home.newWay")}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">Créez</span>{" "}
              <span className="text-secondary">un CV</span>{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                professionnel
              </span>
              <br />
              <span className="text-foreground">en quelques clics</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              {t("home.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/builder">
                  {t("home.cta.start")} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                <Link to="/modify">
                  <FileUp className="mr-2 h-4 w-4" /> {t("home.cta.modify")}
                </Link>
              </Button>
            </div>
          </div>

          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <img
              src="/assets/students/african-student-working.jpg"
              alt="Student working on CV"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
