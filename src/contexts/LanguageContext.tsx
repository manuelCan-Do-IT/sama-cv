import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "EUR" | "USD" | "XOF";
export type Language = "fr" | "en" | "es" | "wo";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: string) => string;
}

const languageMap: Record<Language, string> = {
  fr: "Français",
  en: "English", 
  es: "Español",
  wo: "Wolof",
};

const currencyMap: Record<Language, Currency> = {
  fr: "EUR",
  en: "USD",
  es: "EUR",
  wo: "XOF",
};

const currencySymbols: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  XOF: "FCFA",
};

const translations: Record<Language, Record<string, string>> = {
  fr: {
    "home.title": "Créez un CV professionnel en quelques clics",
    "home.subtitle": "Une plateforme interactive qui vous aide à créer un CV professionnel adapté aux exigences des recruteurs",
    "home.cta.start": "Commencer gratuitement",
    "home.cta.modify": "Modifier un CV existant",
    "home.newWay": "Une nouvelle façon de créer votre CV",
    "login.title": "Connexion",
    "login.email": "Email",
    "login.password": "Mot de passe",
    "login.forgotPassword": "Mot de passe oublié ?",
    "login.button": "Se connecter",
    "login.noAccount": "Vous n'avez pas de compte ?",
    "login.createAccount": "Créer un compte",
    "register.title": "Créer un compte",
    "register.name": "Nom complet",
    "register.email": "Email",
    "register.password": "Mot de passe",
    "register.confirmPassword": "Confirmer le mot de passe",
    "register.button": "S'inscrire",
    "register.hasAccount": "Vous avez déjà un compte ?",
    "register.login": "Se connecter",
    "footer.copyright": "Tous droits réservés",
  },
  en: {
    "home.title": "Create a professional CV in a few clicks",
    "home.subtitle": "An interactive platform that helps you create a professional CV tailored to recruiters' requirements",
    "home.cta.start": "Start for free",
    "home.cta.modify": "Modify an existing CV",
    "home.newWay": "A new way to create your CV",
    "login.title": "Login",
    "login.email": "Email",
    "login.password": "Password",
    "login.forgotPassword": "Forgot password?",
    "login.button": "Login",
    "login.noAccount": "Don't have an account?",
    "login.createAccount": "Create an account",
    "register.title": "Create account",
    "register.name": "Full name",
    "register.email": "Email",
    "register.password": "Password",
    "register.confirmPassword": "Confirm password",
    "register.button": "Register",
    "register.hasAccount": "Already have an account?",
    "register.login": "Login",
    "footer.copyright": "All rights reserved",
  },
  es: {
    "home.title": "Crea un CV profesional en pocos clics",
    "home.subtitle": "Una plataforma interactiva que te ayuda a crear un CV profesional adaptado a los requisitos de los reclutadores",
    "home.cta.start": "Comenzar gratis",
    "home.cta.modify": "Modificar un CV existente",
    "home.newWay": "Una nueva forma de crear tu CV",
    "login.title": "Iniciar sesión",
    "login.email": "Correo electrónico",
    "login.password": "Contraseña",
    "login.forgotPassword": "¿Olvidaste tu contraseña?",
    "login.button": "Iniciar sesión",
    "login.noAccount": "¿No tienes una cuenta?",
    "login.createAccount": "Crear una cuenta",
    "register.title": "Crear cuenta",
    "register.name": "Nombre completo",
    "register.email": "Correo electrónico",
    "register.password": "Contraseña",
    "register.confirmPassword": "Confirmar contraseña",
    "register.button": "Registrarse",
    "register.hasAccount": "¿Ya tienes una cuenta?",
    "register.login": "Iniciar sesión",
    "footer.copyright": "Todos los derechos reservados",
  },
  wo: {
    "home.title": "Defar sa CV bu pro ci natt yu néew",
    "home.subtitle": "Platforme bu lay dimbalé defar CV bu pro bu dëpp ci li ñi di liggeye di seet",
    "home.cta.start": "Tambali ak dara",
    "home.cta.modify": "Soppi CV bi nga am",
    "home.newWay": "Yoon bu bees ngir defar sa CV",
    "login.title": "Dugg",
    "login.email": "Email",
    "login.password": "Baatu yoon",
    "login.forgotPassword": "Fatte nga sa baatu yoon?",
    "login.button": "Dugg",
    "login.noAccount": "Amoo compte?",
    "login.createAccount": "Bindul",
    "register.title": "Bindul",
    "register.name": "Sa tur",
    "register.email": "Email",
    "register.password": "Baatu yoon",
    "register.confirmPassword": "Dëggalal baatu yoon bi",
    "register.button": "Bindul",
    "register.hasAccount": "Amnga compte ba leegi?",
    "register.login": "Dugg",
    "footer.copyright": "Sañ-sañ yépp am nañoo ko",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "fr";
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const savedCurrency = localStorage.getItem("currency");
    return (savedCurrency as Currency) || currencyMap[language as Language];
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // Only update currency if user hasn't manually set it
    const userSetCurrency = localStorage.getItem("userSetCurrency");
    if (!userSetCurrency) {
      setCurrency(currencyMap[lang]);
    }
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem("currency", curr);
    localStorage.setItem("userSetCurrency", "true");
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const getCurrencySymbol = (currency: Currency) => {
  return currencySymbols[currency];
};

export const getLanguageName = (code: Language) => {
  return languageMap[code];
};
