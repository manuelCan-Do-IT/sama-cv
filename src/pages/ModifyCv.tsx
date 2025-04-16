
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export default function ModifyCv() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
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
        setError(t("modify.error.size"));
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError(t("modify.error.format"));
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
        toast({
          title: "CV téléchargé",
          description: "Votre CV a été téléchargé avec succès.",
        });
      }
    }, 100);
  };

  // Redirect after successful upload
  useEffect(() => {
    if (uploadComplete) {
      const timer = setTimeout(() => {
        navigate("/builder");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [uploadComplete, navigate]);
  
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{t("modify.title")}</h1>
        <p className="text-muted-foreground">
          {t("modify.subtitle")}
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("modify.upload")}</CardTitle>
          <CardDescription>
            {t("modify.formats")}
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
                    {t("modify.drop")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {t("modify.maxsize")}
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
                    <Label htmlFor="cv-upload">{t("modify.browse")}</Label>
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
                  {t("modify.upload.btn")}
                </Button>
              </div>
            )}
            
            {uploading && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{t("modify.uploading")}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            
            {uploadComplete && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-green-800 text-center">
                <p className="font-medium">{t("modify.success")}</p>
                <p className="text-sm mt-2">
                  {t("modify.success.message")}
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
              {t("modify.redirect")}
            </p>
          </CardFooter>
        )}
      </Card>
      
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold">{t("how.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="font-bold mb-2">{t("how.step1")}</h3>
            <p className="text-muted-foreground">
              {t("how.step1.desc")}
            </p>
          </div>
          <div className="p-6">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="font-bold mb-2">{t("how.step2")}</h3>
            <p className="text-muted-foreground">
              {t("how.step2.desc")}
            </p>
          </div>
          <div className="p-6">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="font-bold mb-2">{t("how.step3")}</h3>
            <p className="text-muted-foreground">
              {t("how.step3.desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
