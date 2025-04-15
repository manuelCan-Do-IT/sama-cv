
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Template mock data (expanded from showcase component)
const categories = ["Tous", "Professionnels", "Créatifs", "Business", "Académiques", "Minimalistes", "Colorés", "Modernes"];

const templates = [
  {
    id: 1,
    name: "Corporate Elite",
    category: "Professionnels",
    imageUrl: "https://placehold.co/600x800/30D5C8/FFF/?text=CV+Template+1",
    popular: true,
    tags: ["business", "finance", "simple"]
  },
  {
    id: 2,
    name: "Creative Studio",
    category: "Créatifs",
    imageUrl: "https://placehold.co/600x800/9B30FF/FFF/?text=CV+Template+2",
    tags: ["design", "coloré", "créatif"]
  },
  {
    id: 3,
    name: "Academic Research",
    category: "Académiques",
    imageUrl: "https://placehold.co/600x800/FF7F50/FFF/?text=CV+Template+3",
    tags: ["recherche", "doctorat", "professeur"]
  },
  {
    id: 4,
    name: "Minimal Modern",
    category: "Minimalistes",
    imageUrl: "https://placehold.co/600x800/30D5C8/FFF/?text=CV+Template+4",
    popular: true,
    tags: ["simple", "épuré", "moderne"]
  },
  {
    id: 5,
    name: "Bold Executive",
    category: "Business",
    imageUrl: "https://placehold.co/600x800/9B30FF/FFF/?text=CV+Template+5",
    tags: ["management", "direction", "sérieux"]
  },
  {
    id: 6,
    name: "Vibrant Portfolio",
    category: "Colorés",
    imageUrl: "https://placehold.co/600x800/FF7F50/FFF/?text=CV+Template+6",
    tags: ["portfolio", "créatif", "moderne"]
  },
  {
    id: 7,
    name: "Tech Innovator",
    category: "Modernes",
    imageUrl: "https://placehold.co/600x800/30D5C8/FFF/?text=CV+Template+7",
    popular: true,
    tags: ["tech", "développeur", "ingénieur"]
  },
  {
    id: 8,
    name: "Classic Professional",
    category: "Professionnels",
    imageUrl: "https://placehold.co/600x800/9B30FF/FFF/?text=CV+Template+8",
    tags: ["classique", "simple", "traditionnel"]
  }
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter(template => {
    // Filter by category
    const categoryMatch = activeCategory === "Tous" || template.category === activeCategory;
    
    // Filter by search
    const searchMatch = searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="container py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Explorez nos modèles de CV</h1>
        <p className="text-lg text-muted-foreground">
          Découvrez notre collection complète de modèles professionnels et créatifs pour faire briller votre CV.
        </p>
      </div>
      
      {/* Search and filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un modèle..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
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
        </div>
      </div>
      
      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
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
              <div className="p-4 border-t">
                <h3 className="font-bold">{template.name}</h3>
                <div className="flex flex-wrap gap-1 mt-2 mb-4">
                  {template.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-muted px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button asChild className="w-full gradient-bg">
                  <Link to={`/builder?template=${template.id}`}>
                    Utiliser ce modèle
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg font-medium">Aucun modèle trouvé</p>
          <p className="text-muted-foreground">Essayez d'autres termes de recherche ou filtres</p>
        </div>
      )}
    </div>
  );
}
