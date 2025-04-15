
import { FileCheck, Layout, PenTool, MousePointerClick, Upload, Download } from "lucide-react";

const features = [
  {
    icon: <Layout className="h-10 w-10 text-primary" />,
    title: "Modèles professionnels",
    description: "Des modèles élégants et modernes conçus par des experts en recrutement pour maximiser vos chances."
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: "Personnalisation facile",
    description: "Modifiez les couleurs, polices et mise en page pour créer un CV qui reflète votre personnalité."
  },
  {
    icon: <MousePointerClick className="h-10 w-10 text-primary" />,
    title: "Interface intuitive",
    description: "Glissez et déposez les éléments pour construire votre CV sans compétences techniques requises."
  },
  {
    icon: <Upload className="h-10 w-10 text-primary" />,
    title: "Importation de CV",
    description: "Téléchargez votre CV existant et notre système intelligent l'adaptera à nos modèles."
  },
  {
    icon: <FileCheck className="h-10 w-10 text-primary" />,
    title: "Conseils d'experts",
    description: "Suggestions intelligentes pour améliorer le contenu et la structure de votre CV."
  },
  {
    icon: <Download className="h-10 w-10 text-primary" />,
    title: "Formats multiples",
    description: "Téléchargez votre CV dans différents formats (PDF, DOCX) adaptés à vos besoins."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tout ce dont vous avez besoin pour créer un CV parfait</h2>
          <p className="text-lg text-muted-foreground">
            Nos outils vous permettent de créer un CV professionnel sans effort, en offrant des fonctionnalités avancées dans une interface simple.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background border rounded-xl p-6 hover-scale transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
