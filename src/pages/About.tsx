
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users, Award, Heart, BookOpen } from "lucide-react";

export default function About() {
  return (
    <div className="container py-8">
      <section className="mb-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">À propos d'AfroCV</h1>
          <p className="text-lg text-muted-foreground">
            Notre mission est d'aider les étudiants et jeunes professionnels africains à créer des CV remarquables pour réussir leur carrière.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Notre histoire</h2>
            <p className="text-muted-foreground">
              AfroCV est né d'un constat simple : de nombreux étudiants et jeunes professionnels talentueux en Afrique peinent à mettre en valeur leurs compétences dans leurs CV, ce qui limite leurs opportunités professionnelles.
            </p>
            <p className="text-muted-foreground">
              Notre équipe de spécialistes en recrutement et de développeurs passionnés a créé cette plateforme pour répondre à ce besoin, en proposant une solution intuitive et accessible à tous.
            </p>
            <p className="text-muted-foreground">
              Aujourd'hui, AfroCV est devenu un outil essentiel pour des milliers d'utilisateurs qui souhaitent se démarquer sur le marché du travail et mettre toutes les chances de leur côté.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-tr from-purple-DEFAULT/20 to-turquoise-DEFAULT/20 rounded-2xl overflow-hidden h-80">
              {/* This would be replaced with an actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium text-muted-foreground">Image d'équipe ou bureaux</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border rounded-xl p-6 hover:shadow-md transition-all">
            <div className="bg-primary/10 p-3 rounded-full inline-block mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Accessibilité</h3>
            <p className="text-muted-foreground">
              Nous croyons que chacun devrait avoir accès à des outils de qualité pour développer sa carrière, quel que soit son niveau de ressources.
            </p>
          </div>
          
          <div className="border rounded-xl p-6 hover:shadow-md transition-all">
            <div className="bg-primary/10 p-3 rounded-full inline-block mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Excellence</h3>
            <p className="text-muted-foreground">
              Nous nous efforçons de fournir les meilleurs modèles et conseils pour aider nos utilisateurs à atteindre leurs objectifs professionnels.
            </p>
          </div>
          
          <div className="border rounded-xl p-6 hover:shadow-md transition-all">
            <div className="bg-primary/10 p-3 rounded-full inline-block mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Impact social</h3>
            <p className="text-muted-foreground">
              Chaque mois, nous offrons un accès gratuit à nos services premium à des étudiants défavorisés pour contribuer à l'égalité des chances.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission */}
      <section className="mb-16 bg-muted/30 rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Notre mission</h2>
            <p className="text-muted-foreground mb-6">
              Nous voulons donner aux jeunes africains les outils nécessaires pour mettre en valeur leurs talents et compétences, afin qu'ils puissent accéder aux opportunités qu'ils méritent.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">
                  <strong>Éduquer</strong> - Nous partageons notre expertise en matière de CV et de recherche d'emploi à travers des ressources gratuites.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">
                  <strong>Équiper</strong> - Nous fournissons des outils de haute qualité pour la création de CV professionnels.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">
                  <strong>Élever</strong> - Nous aidons à augmenter les chances de succès professionnel de nos utilisateurs.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-background rounded-xl p-6 border">
            <h3 className="font-bold text-xl mb-4">Notre programme social</h3>
            <p className="text-muted-foreground mb-6">
              Pour chaque abonnement premium, nous offrons un accès gratuit à un étudiant dans le besoin. À ce jour, nous avons pu aider plus de 500 étudiants à travers l'Afrique.
            </p>
            <Button asChild className="gradient-bg hover-scale w-full">
              <Link to="/contact">
                En savoir plus sur notre programme 
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Team section would go here in future versions */}
      
      {/* CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Rejoignez les milliers d'utilisateurs qui ont transformé leur carrière grâce à AfroCV.
        </p>
        <Button asChild size="lg" className="gradient-bg hover-scale">
          <Link to="/builder">
            Créer mon CV gratuitement
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
