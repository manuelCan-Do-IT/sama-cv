
import { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileType, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ModifyCv() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Reset states
      setError(null);
      setUploadComplete(false);
      setUploadProgress(0);
      
      const selectedFile = e.target.files[0];
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("Le fichier est trop volumineux. La taille maximale est de 5MB.");
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Format de fichier non supporté. Veuillez télécharger un fichier PDF ou Word.");
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate file upload with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setUploadComplete(true);
        // In a real app, we would process the file here and redirect to the editor
      }
    }, 100);
  };
  
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Modifier un CV existant</h1>
        <p className="text-muted-foreground">
          Téléchargez votre CV existant pour le transformer avec notre éditeur.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Télécharger votre CV</CardTitle>
          <CardDescription>
            Formats acceptés: PDF, Word (.docx, .doc)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {!uploading && !uploadComplete && (
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="mb-4">
                  <div className="mx-auto bg-muted rounded-full h-12 w-12 flex items-center justify-center mb-4">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">
                    Glissez-déposez votre CV ici ou cliquez pour le sélectionner
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Taille maximale: 5MB
                  </p>
                </div>
                <div>
                  <Input
                    id="cv-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <Button asChild variant="outline" className="hover-scale">
                    <Label htmlFor="cv-upload">Parcourir les fichiers</Label>
                  </Button>
                </div>
              </div>
            )}
            
            {file && !uploading && !uploadComplete && (
              <div className="bg-muted/30 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-background p-2 rounded mr-3">
                    <FileType className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(file.size / 1024)} KB
                    </p>
                  </div>
                </div>
                <Button onClick={handleUpload} className="gradient-bg hover-scale">
                  Télécharger
                </Button>
              </div>
            )}
            
            {uploading && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Téléchargement en cours...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            
            {uploadComplete && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-green-800 text-center">
                <p className="font-medium">Téléchargement réussi !</p>
                <p className="text-sm mt-2">
                  Votre CV a été téléchargé avec succès. 
                  Nous sommes en train d'analyser son contenu.
                </p>
                <div className="mt-4">
                  <Progress value={100} className="h-2 bg-green-100" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
        {uploadComplete && (
          <CardFooter>
            <p className="text-sm text-muted-foreground animate-pulse">
              Redirection vers l'éditeur de CV dans quelques secondes...
            </p>
          </CardFooter>
        )}
      </Card>
      
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold">Comment ça fonctionne</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="font-bold mb-2">Téléchargez votre CV</h3>
            <p className="text-muted-foreground">
              Téléchargez votre CV existant au format PDF ou Word.
            </p>
          </div>
          <div className="p-6">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="font-bold mb-2">Notre système l'analyse</h3>
            <p className="text-muted-foreground">
              Notre outil intelligent extrait automatiquement les informations de votre CV.
            </p>
          </div>
          <div className="p-6">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="font-bold mb-2">Personnalisez et améliorez</h3>
            <p className="text-muted-foreground">
              Utilisez notre éditeur pour modifier, améliorer et choisir un nouveau design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
