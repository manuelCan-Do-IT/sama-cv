
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const floatingElements = [
  { text: "education", class: "top-[15%] left-[15%] rotate-[-5deg]" },
  { text: "experience", class: "top-[25%] right-[18%] rotate-[5deg]" },
  { text: "skills", class: "bottom-[35%] left-[22%] rotate-[3deg]" },
  { text: "languages", class: "bottom-[28%] right-[12%] rotate-[-3deg]" },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useLanguage();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        when: "beforeChildren" 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.7, delay: 0.3 }
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="absolute inset-0 bg-[url('/assets/pattern-bg.svg')] opacity-10" />
      
      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute hidden md:block transform ${element.class}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.7, 
            delay: 0.5 + index * 0.2,
            y: {
              duration: 3 + index * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          <div className="card-glass px-6 py-3 text-base font-medium bg-primary/10 text-primary border border-primary/20 rounded-xl shadow-lg backdrop-blur-sm">
            {language === "fr" ? 
              (element.text === "education" ? "Formation" : 
               element.text === "experience" ? "Expérience" : 
               element.text === "skills" ? "Compétences" : 
               "Langues") : 
             language === "en" ? 
              (element.text === "education" ? "Education" : 
               element.text === "experience" ? "Experience" : 
               element.text === "skills" ? "Skills" : 
               "Languages") : 
             language === "es" ? 
              (element.text === "education" ? "Educación" : 
               element.text === "experience" ? "Experiencia" : 
               element.text === "skills" ? "Habilidades" : 
               "Idiomas") : 
              (element.text === "education" ? "Jàng" : 
               element.text === "experience" ? "Xam-xam liggéey" : 
               element.text === "skills" ? "Kàttan" : 
               "Làkk yi")}
          </div>
        </motion.div>
      ))}

      <div className="container relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.span 
              variants={itemVariants}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
            >
              {t("home.newWay")}
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-primary">{language === "fr" ? "Créez" : language === "en" ? "Create" : language === "es" ? "Crea" : "Defar"}</span>{" "}
              <span className="text-secondary">{language === "fr" ? "un CV" : language === "en" ? "a CV" : language === "es" ? "un CV" : "sa CV"}</span>{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {language === "fr" ? "professionnel" : language === "en" ? "professional" : language === "es" ? "profesional" : "bu pro"}
              </span>
              <br />
              <span className="text-foreground">
                {language === "fr" ? "en quelques clics" : language === "en" ? "in a few clicks" : language === "es" ? "en pocos clics" : "ci natt yu néew"}
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground"
            >
              {t("home.subtitle")}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/builder">
                  {t("home.cta.start")} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                <Link to="/modify">
                  <FileUp className="mr-2 h-4 w-4" /> {t("home.cta.modify")}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            variants={imageVariants}
          >
            <img
              src="/assets/students/african-student-working.jpg"
              alt="Student working on CV"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
