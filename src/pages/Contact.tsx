
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message envoyé",
        description: "Merci pour votre message. Nous vous répondrons dans les meilleurs délais.",
      });
      
      // Reset form
      e.currentTarget.reset();
    }, 1500);
  };
  
  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Contactez-nous</h1>
        <p className="text-muted-foreground">
          Nous sommes là pour vous aider. N'hésitez pas à nous contacter si vous avez des questions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Envoyez-nous un message</CardTitle>
            <CardDescription>
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nom complet
                </label>
                <Input id="name" placeholder="Votre nom" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Adresse email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="votre@email.com" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Sujet
                </label>
                <Input id="subject" placeholder="Sujet de votre message" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Écrivez votre message ici..." 
                  rows={5} 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full gradient-bg" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nos informations de contact</CardTitle>
              <CardDescription>
                Vous pouvez également nous contacter directement via ces canaux.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-muted-foreground">support@samacv.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Téléphone</p>
                  <p className="text-muted-foreground">+221 77 000 00 00</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Adresse</p>
                  <p className="text-muted-foreground">
                    Dakar, Sénégal
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Heures d'ouverture</CardTitle>
              <CardDescription>
                Notre équipe de support est disponible pendant ces horaires.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium">9h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium">10h - 15h</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-medium">Fermé</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
