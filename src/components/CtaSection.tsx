
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-light/30 via-turquoise-light/20 to-orange-light/30" />
      
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-DEFAULT/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-turquoise-DEFAULT/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-background/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border shadow-lg animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à créer votre CV professionnel ?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Commencez gratuitement et créez un CV qui se démarque. Aucune carte de crédit requise pour démarrer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="gradient-bg hover-scale">
              <Link to="/builder">
                Commencer gratuitement <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="hover-scale">
              <Link to="/templates">
                Découvrir les modèles
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
