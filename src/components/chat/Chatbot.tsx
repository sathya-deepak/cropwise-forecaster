
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import { PredictionService } from "@/services/PredictionService";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getTranslation(language);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleBotResponse(t.welcomeMessage);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateCropAdvice = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase();
    
    // Check for soil type related questions
    if (normalizedMessage.includes('soil')) {
      const soilTypes = [
        'alluvial', 'black', 'red', 'laterite', 'sandy', 
        'clay', 'loamy', 'saline', 'peaty', 'chalky',
        'silt', 'podzol', 'forest', 'desert'
      ];

      for (const soilType of soilTypes) {
        if (normalizedMessage.includes(soilType)) {
          const recommendations = PredictionService.getSoilTypeRecommendations(soilType);
          return `For ${soilType} soil:\n• Best suited crops: ${recommendations.join(', ')}\n• ${getSoilCareAdvice(soilType)}`;
        }
      }

      return `There are several main soil types in agriculture:\n
1. Alluvial Soil - Best for most crops, naturally fertile
2. Black Soil - Excellent for cotton and sugarcane
3. Red Soil - Good for groundnut and tobacco
4. Laterite Soil - Suitable for tea and coffee
5. Sandy Soil - Good for root vegetables
6. Clay Soil - Perfect for rice cultivation
7. Loamy Soil - Ideal for most crops
8. Saline Soil - Limited crop options, needs treatment
9. Peaty Soil - Good for vegetables with proper drainage

Which soil type would you like to know more about?`;
    }
    
    if (normalizedMessage.includes('weather') || normalizedMessage.includes('climate')) {
      return generateWeatherAdvice(normalizedMessage);
    }
    
    if (normalizedMessage.includes('pest') || normalizedMessage.includes('disease')) {
      return generatePestAdvice(normalizedMessage);
    }
    
    if (normalizedMessage.includes('water') || normalizedMessage.includes('irrigation')) {
      return generateIrrigationAdvice(normalizedMessage);
    }
    
    if (normalizedMessage.includes('fertilizer') || normalizedMessage.includes('nutrient')) {
      return generateFertilizerAdvice(normalizedMessage);
    }
    
    if (normalizedMessage.includes('market') || normalizedMessage.includes('price')) {
      return generateMarketAdvice(normalizedMessage);
    }

    return t.generalAdvice;
  };

  const getSoilCareAdvice = (soilType: string): string => {
    const soilCareAdvice: Record<string, string> = {
      'alluvial': 'Maintain organic matter content and practice crop rotation for sustained fertility.',
      'black': 'Ensure good drainage and avoid waterlogging. Add organic matter regularly.',
      'red': 'Focus on moisture retention and regular fertilization.',
      'laterite': 'Add organic matter and maintain proper pH levels.',
      'sandy': 'Add organic matter to improve water retention and nutrient content.',
      'clay': 'Improve drainage and soil structure through organic amendments.',
      'loamy': 'Maintain the balanced structure through regular organic matter addition.',
      'saline': 'Focus on leaching excess salts and adding gypsum if needed.',
      'peaty': 'Ensure proper drainage and monitor pH levels.',
      'chalky': 'Add organic matter and monitor micronutrient levels.',
      'silt': 'Improve structure and drainage through organic matter addition.',
      'podzol': 'Focus on pH management and organic matter content.',
      'forest': 'Maintain organic matter levels and prevent erosion.',
      'desert': 'Focus on water retention and wind erosion prevention.'
    };

    return soilCareAdvice[soilType] || 'Consider getting a soil test for specific recommendations.';
  };

  const generateWeatherAdvice = (message: string): string => {
    if (message.includes('rain') || message.includes('monsoon')) {
      return 'During rainy season:\n• Ensure proper drainage\n• Monitor disease pressure\n• Consider crop protection measures\n• Plan harvesting timing carefully';
    }
    if (message.includes('summer') || message.includes('hot')) {
      return 'For hot weather:\n• Implement mulching\n• Schedule irrigation early morning/evening\n• Use shade nets if needed\n• Monitor soil moisture regularly';
    }
    if (message.includes('winter') || message.includes('cold')) {
      return 'For winter cultivation:\n• Protect from frost damage\n• Use row covers when needed\n• Adjust irrigation timing\n• Consider cold-resistant varieties';
    }
    return t.weatherAdvice;
  };

  const generatePestAdvice = (message: string): string => {
    let advice = 'Pest management recommendations:\n';
    advice += '• Monitor crops regularly for early detection\n';
    advice += '• Use integrated pest management (IPM) techniques\n';
    advice += '• Consider beneficial insects\n';
    advice += '• Practice crop rotation\n';
    advice += '• Use resistant varieties when available';
    return advice;
  };

  const generateIrrigationAdvice = (message: string): string => {
    let advice = 'Irrigation best practices:\n';
    advice += '• Use soil moisture sensors\n';
    advice += '• Implement drip irrigation where possible\n';
    advice += '• Schedule irrigation based on crop stage\n';
    advice += '• Monitor weather forecasts\n';
    advice += '• Consider water-efficient varieties';
    return advice;
  };

  const generateFertilizerAdvice = (message: string): string => {
    let advice = 'Fertilization guidelines:\n';
    advice += '• Test soil before application\n';
    advice += '• Use balanced NPK ratios\n';
    advice += '• Time applications with crop needs\n';
    advice += '• Consider organic alternatives\n';
    advice += '• Monitor plant response';
    return advice;
  };

  const generateMarketAdvice = (message: string): string => {
    let advice = 'Market considerations:\n';
    advice += '• Monitor current market trends\n';
    advice += '• Consider storage options\n';
    advice += '• Plan harvest timing with market demand\n';
    advice += '• Explore direct marketing channels\n';
    advice += '• Consider value-added products';
    return advice;
  };

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = generateCropAdvice(text);
      handleBotResponse(response);
    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: t.error,
        description: t.errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBotResponse = (text: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-[350px] h-[500px] p-4 flex flex-col gap-4 bg-background border-2 shadow-xl z-50">
          <div className="flex justify-between items-center bg-background">
            <h3 className="font-semibold text-foreground">{t.farmingAssistant}</h3>
          </div>

          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isBot={message.isBot}
                  timestamp={message.timestamp}
                />
              ))}
            </div>
          </ScrollArea>

          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </Card>
      )}
    </>
  );
};

export default Chatbot;
