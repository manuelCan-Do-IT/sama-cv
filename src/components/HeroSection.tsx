
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileUp } from "lucide-react";

const floatingElements = [
  { text: "Éducation", delay: 0.2, class: "top-[10%] left-[10%]" },
  { text: "Expérience", delay: 0.4, class: "top-[20%] right-[15%]" },
  { text: "Compétences", delay: 0.6, class: "bottom-[30%] left-[20%]" },
  { text: "Langues", delay: 0.8, class: "bottom-[20%] right-[10%]" },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
      {/* Floating Elements Animation */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className={`absolute hidden md:block transform ${element.class} animate-float`}
          style={{ animationDelay: `${element.delay}s` }}
        >
          <div className="card-glass px-4 py-2 text-sm font-medium">
            {element.text}
          </div>
        </div>
      ))}

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Une nouvelle façon de créer votre CV
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text">Créez un CV </span>  
              professionnel en quelques clics
            </h1>
            <p className="text-lg text-muted-foreground">
              Une plateforme interactive qui vous aide à créer un CV professionnel adapté aux exigences des recruteurs, vous permettant de vous démarquer sur le marché du travail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gradient-bg hover-scale">
                <Link to="/builder">
                  Commencer gratuitement <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="hover-scale">
                <Link to="/modify">
                  <FileUp className="mr-2 h-4 w-4" /> Modifier un CV existant
                </Link>
              </Button>
            </div>
          </div>
          
          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: "0.3s" }}>
            <div className="relative aspect-[4/5] bg-gradient-to-tr from-purple-DEFAULT/20 to-turquoise-DEFAULT/20 rounded-xl overflow-hidden border border-white/20 shadow-xl">
              {/* This will be replaced with animated CV elements or an interactive preview */}
              <div className="absolute inset-0 flex flex-col p-8">
                <div className="h-24 mb-6 bg-white/40 rounded-lg animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="h-4 bg-white/60 rounded-full"></div>
                  <div className="h-4 bg-white/60 rounded-full"></div>
                  <div className="h-4 bg-white/60 rounded-full"></div>
                  <div className="h-4 bg-white/60 rounded-full"></div>
                </div>
                <div className="h-20 mb-6 bg-white/30 rounded-lg"></div>
                <div className="h-32 bg-white/20 rounded-lg"></div>
                <div className="mt-auto flex justify-between">
                  <div className="h-8 w-24 bg-primary/30 rounded-full"></div>
                  <div className="h-8 w-24 bg-secondary/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
