
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

// Template mock data with real images
const templates = [
  {
    id: 1,
    name: "Corporate Elite",
    category: "professional",
    imageUrl: "/assets/cv-templates/template-1.svg",
    popular: true,
    tags: ["business", "finance", "simple"]
  },
  {
    id: 2,
    name: "Creative Studio",
    category: "creative",
    imageUrl: "/assets/cv-templates/template-2.svg",
    tags: ["design", "coloré", "créatif"]
  },
  {
    id: 3,
    name: "Academic Research",
    category: "academic",
    imageUrl: "/assets/cv-templates/template-3.svg",
    tags: ["recherche", "doctorat", "professeur"]
  },
  {
    id: 4,
    name: "Minimal Modern",
    category: "minimalist",
    imageUrl: "/assets/cv-templates/template-1.svg",
    popular: true,
    tags: ["simple", "épuré", "moderne"]
  },
  {
    id: 5,
    name: "Bold Executive",
    category: "business",
    imageUrl: "/assets/cv-templates/template-3.svg",
    tags: ["management", "direction", "sérieux"]
  },
  {
    id: 6,
    name: "Vibrant Portfolio",
    category: "colorful",
    imageUrl: "/assets/cv-templates/template-2.svg",
    tags: ["portfolio", "créatif", "moderne"]
  },
  {
    id: 7,
    name: "Tech Innovator",
    category: "modern",
    imageUrl: "/assets/cv-templates/template-1.svg",
    popular: true,
    tags: ["tech", "développeur", "ingénieur"]
  },
  {
    id: 8,
    name: "Classic Professional",
    category: "professional",
    imageUrl: "/assets/cv-templates/template-3.svg",
    tags: ["classique", "simple", "traditionnel"]
  }
];

export default function Templates() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "all", "professional", "creative", "business", 
    "academic", "minimalist", "colorful", "modern"
  ];

  const filteredTemplates = templates.filter(template => {
    // Filter by category
    const categoryMatch = activeCategory === "all" || template.category === activeCategory;
    
    // Filter by search
    const searchMatch = searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="container py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("templates.title")}</h1>
        <p className="text-lg text-muted-foreground">
          {t("templates.subtitle")}
        </p>
      </div>
      
      {/* Search and filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("templates.search")}
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
                {t(`templates.category.${category}`)}
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
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full z-10">
                  {t("templates.popular")}
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
                    {t("templates.use")}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg font-medium">{t("templates.notfound")}</p>
          <p className="text-muted-foreground">{t("templates.notfound.subtitle")}</p>
        </div>
      )}
    </div>
  );
}
