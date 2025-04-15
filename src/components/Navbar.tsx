
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/assets/logo.svg" alt="AfroCV Logo" className="h-8 w-auto" />
          <span className="text-2xl font-display font-bold gradient-text">AfroCV</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Accueil
          </Link>
          <Link to="/templates" className="text-sm font-medium transition-colors hover:text-primary">
            Modèles
          </Link>
          <Link to="/builder" className="text-sm font-medium transition-colors hover:text-primary">
            Créer un CV
          </Link>
          <Link to="/modify" className="text-sm font-medium transition-colors hover:text-primary">
            Modifier un CV
          </Link>
          <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Tarifs
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            À propos
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild className="gradient-bg hover-scale">
            <Link to="/builder">Commencer gratuitement</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background border-b shadow-lg animate-fade-in">
          <div className="container py-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/templates" 
              className="block py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Modèles
            </Link>
            <Link 
              to="/builder" 
              className="block py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Créer un CV
            </Link>
            <Link 
              to="/modify" 
              className="block py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Modifier un CV
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Button asChild className="w-full gradient-bg">
              <Link 
                to="/builder" 
                onClick={() => setIsMenuOpen(false)}
              >
                Commencer gratuitement
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
