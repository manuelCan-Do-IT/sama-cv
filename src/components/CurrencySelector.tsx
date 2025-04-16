
import { useLanguage, getCurrencySymbol } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DollarSign } from "lucide-react";

export function CurrencySelector() {
  const { currency, setCurrency } = useLanguage();
  
  const currencies = [
    { code: "EUR", name: "Euro" },
    { code: "USD", name: "US Dollar" },
    { code: "XOF", name: "Franc CFA" }
  ] as const;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 h-9">
          <DollarSign className="h-4 w-4" />
          <span className="hidden md:inline">{getCurrencySymbol(currency)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div className="grid gap-1">
          {currencies.map((curr) => (
            <Button
              key={curr.code}
              variant={curr.code === currency ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrency(curr.code)}
            >
              {getCurrencySymbol(curr.code)} - {curr.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
