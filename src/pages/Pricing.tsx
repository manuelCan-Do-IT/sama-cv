
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage, getCurrencySymbol } from "@/contexts/LanguageContext";
import { CurrencySelector } from "@/components/CurrencySelector";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { t, currency } = useLanguage();

  // Base prices in EUR
  const basePrices = {
    premium: 9.99,
    student: 4.99
  };

  // Define conversion rates
  const conversionRates = {
    EUR: 1,
    USD: 1.1,  // 1 EUR = 1.1 USD
    XOF: 655.957  // 1 EUR = 655.957 XOF (fixed rate for CFA franc)
  };

  // Calculate prices in selected currency
  const getPrice = (basePrice: number) => {
    const convertedPrice = basePrice * conversionRates[currency];
    return currency === "XOF" 
      ? Math.round(convertedPrice) 
      : convertedPrice.toFixed(2);
  };

  // Create plans with dynamic prices
  const plans = [
    {
      name: t("pricing.free"),
      description: t("pricing.free.desc"),
      price: "0",
      billing: "",
      features: [
        "1 CV à télécharger",
        "Accès à 3 modèles de base",
        "Format de téléchargement PDF",
        "Avec filigrane SamaCV",
      ],
      limitations: [
        "Modèles premium non disponibles",
        "Pas de format Word",
        "Suggéstion d'amélioration limitée"
      ],
      buttonText: t("pricing.free.btn"),
      buttonVariant: "outline" as const
    },
    {
      name: t("pricing.premium"),
      description: t("pricing.premium.desc"),
      price: getPrice(billingCycle === "yearly" ? basePrices.premium * 0.8 : basePrices.premium),
      billing: t("pricing.per.month"),
      mostPopular: true,
      features: [
        "CV illimités",
        "Accès à tous les modèles",
        "Sans filigrane",
        "Formats PDF et Word",
        "Suggestions d'amélioration avancées",
        "Support prioritaire",
        "Mise à jour gratuite des nouveaux modèles"
      ],
      buttonText: t("pricing.premium.btn"),
      buttonVariant: "default" as const
    },
    {
      name: t("pricing.student"),
      description: t("pricing.student.desc"),
      price: getPrice(billingCycle === "yearly" ? basePrices.student * 0.8 : basePrices.student),
      billing: t("pricing.per.month"),
      features: [
        "3 CV à télécharger",
        "Accès à 10 modèles premium",
        "Sans filigrane",
        "Formats PDF et Word",
        "Suggestions d'amélioration"
      ],
      limitations: [
        "Vérification du statut étudiant requise"
      ],
      buttonText: t("pricing.student.btn"),
      buttonVariant: "outline" as const
    }
  ];

  const faqs = [
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment. Vous continuerez à avoir accès au service jusqu'à la fin de votre période de facturation en cours."
    },
    {
      question: "Comment fonctionne la vérification du statut étudiant ?",
      answer: "Nous utilisons un service de vérification qui valide votre adresse email académique ou votre carte d'étudiant. Le processus est simple et prend généralement moins de 24 heures."
    },
    {
      question: "Les modèles sont-ils réellement optimisés pour le recrutement ?",
      answer: "Absolument ! Tous nos modèles sont créés en collaboration avec des recruteurs professionnels et des experts RH pour maximiser vos chances d'être remarqué."
    },
    {
      question: "Puis-je changer de modèle après avoir créé mon CV ?",
      answer: "Oui, vous pouvez changer de modèle à tout moment sans perdre vos informations. C'est l'un des grands avantages de notre plateforme."
    }
  ];
  
  return (
    <div className="container py-8">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-4">{t("pricing.title")}</h1>
        <p className="text-lg text-muted-foreground">
          {t("pricing.subtitle")}
        </p>
      </div>

      {/* Currency selector */}
      <div className="flex justify-center mb-8">
        <CurrencySelector />
      </div>
      
      {/* Billing toggle */}
      <div className="flex justify-center items-center mb-12">
        <div className="bg-muted rounded-full p-1 inline-flex">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              billingCycle === "monthly" 
                ? "bg-background shadow-sm" 
                : "text-muted-foreground"
            }`}
            onClick={() => setBillingCycle("monthly")}
          >
            {t("pricing.monthly")}
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              billingCycle === "yearly" 
                ? "bg-background shadow-sm" 
                : "text-muted-foreground"
            }`}
            onClick={() => setBillingCycle("yearly")}
          >
            {t("pricing.yearly")} <span className="text-xs text-green-600 font-normal">{t("pricing.discount")}</span>
          </button>
        </div>
      </div>
      
      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-xl overflow-hidden transition-all hover:shadow-lg ${
              plan.mostPopular 
                ? "border-primary shadow-md relative" 
                : ""
            }`}
          >
            {plan.mostPopular && (
              <div className="bg-primary text-primary-foreground text-xs font-medium py-1 text-center">
                {t("pricing.popular")}
              </div>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {plan.price === "0" ? "0" : `${getCurrencySymbol(currency)}${plan.price}`}
                </span>
                <span className="text-muted-foreground">{plan.billing}</span>
                {billingCycle === "yearly" && plan.price !== "0" && (
                  <p className="text-xs text-green-600 mt-1">{t("pricing.yearly.save")}</p>
                )}
              </div>
              <Button
                asChild
                variant={plan.buttonVariant}
                className={`w-full mb-6 ${plan.mostPopular ? "gradient-bg hover-scale" : ""}`}
              >
                <Link to="/builder">
                  {plan.buttonText}
                </Link>
              </Button>
              <div className="space-y-3">
                <p className="font-medium">{t("pricing.included")}</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations && (
                  <>
                    <p className="font-medium pt-2">{t("pricing.limitations")}</p>
                    {plan.limitations.map((limitation, i) => (
                      <div key={i} className="flex items-center text-muted-foreground">
                        <span className="h-4 w-4 mr-2 flex items-center justify-center text-xs">×</span>
                        <span className="text-sm">{limitation}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{t("pricing.faq.title")}</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                {faq.question}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="ml-2 h-4 w-4 text-muted-foreground inline" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{t("pricing.faq.more")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t("pricing.faq.others")}
          </p>
          <Button asChild variant="outline">
            <Link to="/contact">{t("pricing.faq.contact")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
