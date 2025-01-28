import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  console.log('Rendering LanguageSelector');
  
  return (
    <div className="absolute top-4 right-4">
      <Select onValueChange={onLanguageChange} defaultValue="en">
        <SelectTrigger className="w-[120px] bg-white">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="de">Deutsch</SelectItem>
          <SelectItem value="hi">हिंदी</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;