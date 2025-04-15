
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

// Placeholder components - these would be expanded in future iterations
const CVSections = [
  { id: "personal", title: "Informations personnelles" },
  { id: "experience", title: "Expérience professionnelle" },
  { id: "education", title: "Formation" },
  { id: "skills", title: "Compétences" },
  { id: "languages", title: "Langues" },
  { id: "interests", title: "Centres d'intérêt" },
];

export default function Builder() {
  const [activeSection, setActiveSection] = useState("personal");
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Créez votre CV</h1>
        <p className="text-muted-foreground">
          Utilisez notre éditeur pour créer un CV professionnel en quelques minutes.
        </p>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="editor">Éditeur</TabsTrigger>
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" /> Sauvegarder
            </Button>
            <Button size="sm">
              <FileDown className="mr-2 h-4 w-4" /> Télécharger PDF
            </Button>
          </div>
        </div>
        
        <TabsContent value="editor" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CV sections panel */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Sections</CardTitle>
                  <CardDescription>
                    Ajoutez ou modifiez les sections de votre CV
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
                    Ajouter une section
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* CV editor panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {CVSections.find(s => s.id === activeSection)?.title || "Éditeur"}
                  </CardTitle>
                  <CardDescription>
                    Complétez les informations pour cette section
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
              <CardTitle>Aperçu de votre CV</CardTitle>
              <CardDescription>
                Voici comment votre CV apparaîtra une fois téléchargé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] border rounded-lg p-8 bg-white">
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
