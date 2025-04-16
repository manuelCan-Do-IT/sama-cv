
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const {
    t,
    language
  } = useLanguage();
  
  const navItems = [{
    name: language === "fr" ? "Accueil" : language === "en" ? "Home" : language === "es" ? "Inicio" : "Dalal bi",
    key: "home",
    path: "/"
  }, {
    name: language === "fr" ? "Modèles" : language === "en" ? "Templates" : language === "es" ? "Plantillas" : "Royuwaay yi",
    key: "templates",
    path: "/templates"
  }, {
    name: language === "fr" ? "Créer CV" : language === "en" ? "Create CV" : language === "es" ? "Crear CV" : "Defar CV",
    key: "builder",
    path: "/builder"
  }, {
    name: language === "fr" ? "Modifier CV" : language === "en" ? "Modify CV" : language === "es" ? "Modificar CV" : "Soppi CV",
    key: "modify",
    path: "/modify"
  }, {
    name: language === "fr" ? "Tarifs" : language === "en" ? "Pricing" : language === "es" ? "Precios" : "Njëg yi",
    key: "pricing",
    path: "/pricing"
  }, {
    name: language === "fr" ? "À propos" : language === "en" ? "About" : language === "es" ? "Acerca de" : "Ci mbiru",
    key: "about",
    path: "/about"
  }];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return <header className={cn("sticky top-0 z-40 w-full transition-all duration-200", scrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent")}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img alt="SamaCV" height="40" className="h-9 object-contain" src="/lovable-uploads/6d520a53-c20d-46d7-a543-22f73f2addb8.png" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => <Link key={item.key} to={item.path} className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === item.path ? "text-primary font-bold" : "text-muted-foreground")}>
              {item.name}
            </Link>)}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">
              <LogIn className="mr-1 h-4 w-4" />
              {language === "fr" ? "Connexion" : language === "en" ? "Login" : language === "es" ? "Iniciar sesión" : "Dugg"}
            </Link>
          </Button>
          
          <Button size="sm" className="bg-secondary hover:bg-secondary/90" asChild>
            <Link to="/register">
              <UserPlus className="mr-1 h-4 w-4" />
              {language === "fr" ? "S'inscrire" : language === "en" ? "Register" : language === "es" ? "Registrarse" : "Bindul"}
            </Link>
          </Button>
          
          <LanguageSelector />
          <ThemeToggle />
        </div>

        {isMobile && <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector />
          <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>}
      </div>

      {isOpen && isMobile && <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-top-1 md:hidden bg-background border-t">
          <nav className="flex flex-col space-y-6 mb-8">
            {navItems.map(item => <Link key={item.key} to={item.path} className={cn("flex items-center text-lg font-medium transition-colors hover:text-primary", location.pathname === item.path ? "text-primary font-bold" : "text-muted-foreground")}>
                {item.name}
              </Link>)}
          </nav>
          <div className="flex flex-col space-y-4">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                {language === "fr" ? "Connexion" : language === "en" ? "Login" : language === "es" ? "Iniciar sesión" : "Dugg"}
              </Link>
            </Button>
            
            <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
              <Link to="/register">
                <UserPlus className="mr-2 h-4 w-4" />
                {language === "fr" ? "S'inscrire" : language === "en" ? "Register" : language === "es" ? "Registrarse" : "Bindul"}
              </Link>
            </Button>
            
            <div className="flex justify-between">
              <ThemeToggle />
            </div>
          </div>
        </div>}
    </header>;
}
