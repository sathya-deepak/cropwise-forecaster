
import React from 'react';
import { Avatar } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <Avatar className={`w-8 h-8 ${isBot ? 'bg-primary' : 'bg-secondary'}`}>
        <span className="text-xs text-white">{isBot ? 'Bot' : 'You'}</span>
      </Avatar>
      <div className={`max-w-[80%] rounded-lg p-3 ${
        isBot ? 'bg-primary/20 border border-primary/30' : 'bg-secondary/20 border border-secondary/30'
      }`}>
        <p className="text-sm text-foreground">{message}</p>
        <span className="text-xs text-gray-500 mt-1">
          {timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
