import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, SupportedLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  
  console.log('Rendering LanguageSelector with current language:', language);
  
  const handleValueChange = (value: string) => {
    setLanguage(value as SupportedLanguage);
  };
  
  return (
    <div className="absolute top-4 right-4">
      <Select value={language} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[120px] bg-white">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="hi">हिंदी</SelectItem>
          <SelectItem value="te">తెలుగు</SelectItem>
          <SelectItem value="ta">தமிழ்</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;