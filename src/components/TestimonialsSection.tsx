
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: "Aminata Diallo",
    position: "Diplômée en Communication",
    content: "Grâce à AfroCV, j'ai pu créer un CV professionnel qui a attiré l'attention des recruteurs. J'ai décroché un poste dans une agence internationale juste deux semaines après avoir postulé !",
    avatar: "/assets/avatar-1.svg",
    rating: 5
  },
  {
    id: 2,
    name: "Kofi Mensah",
    position: "Ingénieur logiciel",
    content: "L'interface intuitive et les modèles modernes m'ont permis de créer un CV qui se démarque. Les conseils proposés ont vraiment fait une différence dans la manière dont j'ai présenté mes compétences.",
    avatar: "/assets/avatar-2.svg",
    rating: 5
  },
  {
    id: 3,
    name: "Fatou Ndiaye",
    position: "Étudiante en finance",
    content: "J'ai pu télécharger mon ancien CV et le transformer complètement. Le résultat était tellement professionnel que mon professeur l'a utilisé comme exemple pour toute la classe !",
    avatar: "/assets/avatar-3.svg",
    rating: 4
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez comment AfroCV aide les étudiants et jeunes professionnels à réussir leur carrière.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="min-w-full px-4"
                >
                  <div className="bg-background border rounded-xl p-8 md:p-10 shadow-sm">
                    {/* Rating */}
                    <div className="flex mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-orange-DEFAULT fill-orange-DEFAULT' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <blockquote className="text-xl mb-8">
                      "{testimonial.content}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full overflow-hidden h-12 w-12">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant={index === activeIndex ? "default" : "outline"}
                className={`w-3 h-3 p-0 rounded-full ${index === activeIndex ? 'bg-primary' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
            <Button 
              variant="outline" 
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
