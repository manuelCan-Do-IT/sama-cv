
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const NAV_ITEMS = [
  { name: "Accueil", key: "home", path: "/" },
  { name: "Modèles", key: "templates", path: "/templates" },
  { name: "Créer CV", key: "builder", path: "/builder" },
  { name: "Modifier CV", key: "modify", path: "/modify" },
  { name: "Tarifs", key: "pricing", path: "/pricing" },
  { name: "À propos", key: "about", path: "/about" },
];

export function Navbar() {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { name: "Accueil", key: "home", path: "/" },
    { name: "Modèles", key: "templates", path: "/templates" },
    { name: "Créer CV", key: "builder", path: "/builder" },
    { name: "Modifier CV", key: "modify", path: "/modify" },
    { name: "Tarifs", key: "pricing", path: "/pricing" },
    { name: "À propos", key: "about", path: "/about" },
  ];

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
    // Close mobile menu on navigation
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.svg" alt="SamaCV" height="40" className="h-10" />
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.path
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>

          {isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-top-1 md:hidden bg-background border-t">
          <nav className="flex flex-col space-y-6 mb-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
