
import { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileDown, Pencil, Plus, Save } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Builder() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template");
  
  const [activeSection, setActiveSection] = useState("personal");
  const [loading, setLoading] = useState(false);
  
  // CV sections
  const CVSections = [
    { id: "personal", title: t("builder.personal") },
    { id: "experience", title: t("builder.experience") },
    { id: "education", title: t("builder.education") },
    { id: "skills", title: t("builder.skills") },
    { id: "languages", title: t("builder.languages") },
    { id: "interests", title: t("builder.interests") },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "CV sauvegardé",
        description: "Votre CV a été sauvegardé avec succès.",
      });
    }, 1000);
  };

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "CV téléchargé",
        description: "Votre CV a été téléchargé au format PDF.",
      });
    }, 1000);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("builder.title")}</h1>
        <p className="text-muted-foreground">
          {t("builder.subtitle")}
          {templateId && (
            <span className="ml-2 text-primary">
              (Modèle #{templateId} sélectionné)
            </span>
          )}
        </p>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="editor">{t("builder.editor")}</TabsTrigger>
            <TabsTrigger value="preview">{t("builder.preview")}</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={loading}>
              <Save className="mr-2 h-4 w-4" /> {t("builder.save")}
            </Button>
            <Button size="sm" onClick={handleDownload} disabled={loading}>
              <FileDown className="mr-2 h-4 w-4" /> {t("builder.download")}
            </Button>
          </div>
        </div>
        
        <TabsContent value="editor" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CV sections panel */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>{t("builder.sections")}</CardTitle>
                  <CardDescription>
                    {t("builder.sections.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {CVSections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      {section.title}
                    </Button>
                  ))}
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    <Plus className="mr-2 h-4 w-4" />
                    {t("builder.add.section")}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* CV editor panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {CVSections.find(s => s.id === activeSection)?.title || t("builder.editor")}
                  </CardTitle>
                  <CardDescription>
                    {t("builder.sections.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                    <p>Ici s'afficherait le formulaire d'édition pour la section "{CVSections.find(s => s.id === activeSection)?.title}"</p>
                    <p className="text-sm mt-2">Cette fonctionnalité sera développée dans la prochaine version</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>{t("builder.preview.title")}</CardTitle>
              <CardDescription>
                {t("builder.preview.subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] border rounded-lg p-8 bg-white">
                {templateId ? (
                  <img 
                    src={`/assets/cv-templates/template-${(parseInt(templateId) <= 3) ? templateId : (parseInt(templateId) % 3) + 1}.svg`} 
                    alt="CV Preview" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="h-full w-full flex flex-col">
                    <div className="h-24 mb-6 bg-muted rounded-lg"></div>
                    <div className="space-y-4">
                      <div className="h-4 bg-muted rounded-full w-3/4"></div>
                      <div className="h-4 bg-muted rounded-full"></div>
                      <div className="h-4 bg-muted rounded-full w-5/6"></div>
                    </div>
                    <div className="mt-8">
                      <div className="h-6 bg-primary/20 rounded-md w-40 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded-full"></div>
                        <div className="h-4 bg-muted rounded-full w-5/6"></div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="h-6 bg-primary/20 rounded-md w-40 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded-full"></div>
                        <div className="h-4 bg-muted rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="h-6 bg-primary/20 rounded-md w-40 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded-full w-1/2"></div>
                        <div className="h-4 bg-muted rounded-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
