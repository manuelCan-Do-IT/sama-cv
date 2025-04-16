
import { useLanguage } from "@/contexts/LanguageContext";

export function HowItWorksSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{t("howworks.title")}</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">{t("howworks.description")}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="relative flex flex-col items-center text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <img 
              src="/public/lovable-uploads/dfe31c76-76a0-414c-8ea3-bb3dbc85bb84.png" 
              alt="Select template step" 
              className="w-full max-w-[250px] h-auto mb-6"
              style={{ objectFit: 'cover', objectPosition: 'left center', clipPath: 'inset(0 67% 0 0)' }}
            />
            <h3 className="text-xl font-bold mb-2">{t("howworks.step1.title")}</h3>
            <p className="text-muted-foreground">{t("howworks.step1.description")}</p>
          </div>
          
          <div className="relative flex flex-col items-center text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <img 
              src="/public/lovable-uploads/dfe31c76-76a0-414c-8ea3-bb3dbc85bb84.png" 
              alt="Add content step" 
              className="w-full max-w-[250px] h-auto mb-6"
              style={{ objectFit: 'cover', objectPosition: 'center', clipPath: 'inset(0 33% 0 33%)' }}
            />
            <h3 className="text-xl font-bold mb-2">{t("howworks.step2.title")}</h3>
            <p className="text-muted-foreground">{t("howworks.step2.description")}</p>
          </div>
          
          <div className="relative flex flex-col items-center text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <img 
              src="/public/lovable-uploads/dfe31c76-76a0-414c-8ea3-bb3dbc85bb84.png" 
              alt="Download step" 
              className="w-full max-w-[250px] h-auto mb-6"
              style={{ objectFit: 'cover', objectPosition: 'right center', clipPath: 'inset(0 0 0 67%)' }}
            />
            <h3 className="text-xl font-bold mb-2">{t("howworks.step3.title")}</h3>
            <p className="text-muted-foreground">{t("howworks.step3.description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
