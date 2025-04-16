
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      // Here you would handle registration with backend
      console.log("Registration data:", data);
      toast({
        title: language === "fr" ? "Inscription réussie" : 
               language === "en" ? "Registration successful" : 
               language === "es" ? "Registro exitoso" : 
               "Mbindal gi baax na",
        description: language === "fr" ? "Votre compte a été créé" : 
                     language === "en" ? "Your account has been created" : 
                     language === "es" ? "Tu cuenta ha sido creada" : 
                     "Sa compte bi defar nañu ko",
      });
      // Redirect to login after registration
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: language === "fr" ? "Échec de l'inscription" : 
               language === "en" ? "Registration failed" : 
               language === "es" ? "Error de registro" : 
               "Mbindal gi baaxul",
        description: language === "fr" ? "Une erreur s'est produite. Veuillez réessayer." : 
                     language === "en" ? "An error occurred. Please try again." : 
                     language === "es" ? "Ha ocurrido un error. Por favor, inténtalo de nuevo." : 
                     "Am na jafe-jafe. Jéemaatal.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg shadow-lg border"
      >
        <motion.div variants={itemVariants} className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-secondary" />
          <h1 className="mt-4 text-2xl font-bold">
            {language === "fr" ? "Créer un compte" : 
             language === "en" ? "Create account" : 
             language === "es" ? "Crear cuenta" : 
             "Bindul"}
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "fr" ? "Nom complet" : 
                       language === "en" ? "Full name" : 
                       language === "es" ? "Nombre completo" : 
                       "Sa tur"}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="John Doe" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "fr" ? "Email" : 
                       language === "en" ? "Email" : 
                       language === "es" ? "Correo electrónico" : 
                       "Email"}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="you@example.com" 
                          className="pl-10" 
                          type="email"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "fr" ? "Mot de passe" : 
                       language === "en" ? "Password" : 
                       language === "es" ? "Contraseña" : 
                       "Baatu yoon"}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="password" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "fr" ? "Confirmer le mot de passe" : 
                       language === "en" ? "Confirm password" : 
                       language === "es" ? "Confirmar contraseña" : 
                       "Dëggalal baatu yoon bi"}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="password" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === "fr" ? "Chargement..." : 
                     language === "en" ? "Loading..." : 
                     language === "es" ? "Cargando..." : 
                     "Di bind..."}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {language === "fr" ? "S'inscrire" : 
                     language === "en" ? "Register" : 
                     language === "es" ? "Registrarse" : 
                     "Bindul"}
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
        
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-sm text-muted-foreground">
            {language === "fr" ? "Vous avez déjà un compte ?" : 
             language === "en" ? "Already have an account?" : 
             language === "es" ? "¿Ya tienes una cuenta?" : 
             "Amnga compte ba leegi?"}{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              {language === "fr" ? "Se connecter" : 
               language === "en" ? "Login" : 
               language === "es" ? "Iniciar sesión" : 
               "Dugg"}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
