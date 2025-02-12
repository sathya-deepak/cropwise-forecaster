
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
      // Add welcome message when chat is opened
      handleBotResponse(t.welcomeMessage);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateCropAdvice = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase();
    
    if (normalizedMessage.includes('weather')) {
      return t.weatherAdvice;
    }
    if (normalizedMessage.includes('pest') || normalizedMessage.includes('disease')) {
      return t.pestAdvice;
    }
    if (normalizedMessage.includes('water') || normalizedMessage.includes('irrigation')) {
      return t.waterAdvice;
    }
    if (normalizedMessage.includes('fertilizer') || normalizedMessage.includes('nutrient')) {
      return t.fertilizerAdvice;
    }
    
    return t.generalAdvice;
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
      // Simulate API delay
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
