
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
import { LogIn, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      // Here you would handle login with backend
      console.log("Login data:", data);
      toast({
        title: language === "fr" ? "Connexion réussie" : 
               language === "en" ? "Login successful" : 
               language === "es" ? "Inicio de sesión exitoso" : 
               "Dugg nga bu baax",
        description: language === "fr" ? "Vous êtes connecté à votre compte" : 
                     language === "en" ? "You are now logged into your account" : 
                     language === "es" ? "Has iniciado sesión en tu cuenta" : 
                     "Léegi dugg nga ci sa compte",
      });
      // Redirect to home after login
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: language === "fr" ? "Échec de la connexion" : 
               language === "en" ? "Login failed" : 
               language === "es" ? "Error de inicio de sesión" : 
               "Dugg bi daña ko bañ",
        description: language === "fr" ? "Veuillez vérifier vos identifiants" : 
                     language === "en" ? "Please check your credentials" : 
                     language === "es" ? "Por favor, verifica tus credenciales" : 
                     "Xoolal bu baax sa email ak sa baatu yoon",
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
          <LogIn className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">
            {language === "fr" ? "Connexion" : 
             language === "en" ? "Login" : 
             language === "es" ? "Iniciar sesión" : 
             "Dugg"}
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="flex justify-end">
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        {language === "fr" ? "Mot de passe oublié ?" : 
                         language === "en" ? "Forgot password?" : 
                         language === "es" ? "¿Olvidaste tu contraseña?" : 
                         "Fatte nga sa baatu yoon?"}
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === "fr" ? "Chargement..." : 
                     language === "en" ? "Loading..." : 
                     language === "es" ? "Cargando..." : 
                     "Di dugg..."}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    {language === "fr" ? "Se connecter" : 
                     language === "en" ? "Login" : 
                     language === "es" ? "Iniciar sesión" : 
                     "Dugg"}
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
        
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-sm text-muted-foreground">
            {language === "fr" ? "Vous n'avez pas de compte ?" : 
             language === "en" ? "Don't have an account?" : 
             language === "es" ? "¿No tienes una cuenta?" : 
             "Amoo compte?"}{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              {language === "fr" ? "S'inscrire" : 
               language === "en" ? "Register" : 
               language === "es" ? "Regístrate" : 
               "Bindul"}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
