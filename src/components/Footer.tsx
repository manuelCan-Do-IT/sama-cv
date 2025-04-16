
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 py-8 border-t">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link to="/" className="flex items-center">
            <img src="/assets/logo.svg" alt="SamaCV" height="40" className="h-8" />
          </Link>
          <p className="text-muted-foreground">
            Plateforme de création et personnalisation de CV pour étudiants et jeunes professionnels.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Liens rapides</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/templates" className="text-muted-foreground hover:text-primary transition-colors">
                Modèles
              </Link>
            </li>
            <li>
              <Link to="/builder" className="text-muted-foreground hover:text-primary transition-colors">
                Créer un CV
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Tarifs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Aide</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Confidentialité
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <address className="not-italic text-muted-foreground">
            <p>support@samacv.com</p>
            <p>+221 77 000 00 00</p>
            <p>Dakar, Sénégal</p>
          </address>
        </div>
      </div>

      <div className="container mt-8 pt-4 border-t">
        <p className="text-center text-muted-foreground text-sm">
          © {currentYear} SamaCV. {t("footer.copyright")}.
        </p>
      </div>
    </footer>
  );
};
