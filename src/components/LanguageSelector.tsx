
import { useLanguage, getLanguageName, Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  
  const languages: Language[] = ["fr", "en", "es", "wo"];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 h-9">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{getLanguageName(language)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div className="grid gap-1">
          {languages.map((lang) => (
            <Button
              key={lang}
              variant={lang === language ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setLanguage(lang)}
            >
              {getLanguageName(lang)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
