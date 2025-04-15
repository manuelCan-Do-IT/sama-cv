
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Template mock data
const templateCategories = ["Tous", "Professionnels", "Créatifs", "Académiques", "Minimalistes"];

const templates = [
  {
    id: 1,
    name: "Corporate Elite",
    category: "Professionnels",
    imageUrl: "https://placehold.co/600x800/30D5C8/FFF/?text=CV+Template+1",
    popular: true
  },
  {
    id: 2,
    name: "Creative Studio",
    category: "Créatifs",
    imageUrl: "https://placehold.co/600x800/9B30FF/FFF/?text=CV+Template+2"
  },
  {
    id: 3,
    name: "Academic Research",
    category: "Académiques",
    imageUrl: "https://placehold.co/600x800/FF7F50/FFF/?text=CV+Template+3"
  },
  {
    id: 4,
    name: "Minimal Modern",
    category: "Minimalistes",
    imageUrl: "https://placehold.co/600x800/30D5C8/FFF/?text=CV+Template+4",
    popular: true
  }
];

export function TemplateShowcase() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredTemplates = activeCategory === "Tous" 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Modèles professionnels pour tous les métiers</h2>
          <p className="text-lg text-muted-foreground">
            Choisissez parmi notre sélection de modèles soigneusement conçus pour vous aider à créer un CV qui se démarque.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {templateCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category 
                  ? "bg-primary text-white" 
                  : "bg-background hover:bg-primary/10"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id} 
              className="group relative bg-background rounded-xl overflow-hidden border hover:shadow-lg transition-all hover-scale"
            >
              {template.popular && (
                <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full z-10">
                  Populaire
                </div>
              )}
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={template.imageUrl}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 w-full">
                  <h3 className="text-white font-bold text-lg mb-2">{template.name}</h3>
                  <Button asChild size="sm" className="w-full gradient-bg">
                    <Link to={`/builder?template=${template.id}`}>
                      Utiliser ce modèle
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="hover-scale">
            <Link to="/templates">
              Découvrir tous nos modèles <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
