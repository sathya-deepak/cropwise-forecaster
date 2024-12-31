import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface MonthYearSelectorProps {
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

const MonthYearSelector = ({ onMonthChange, onYearChange }: MonthYearSelectorProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="month">Month</Label>
        <Select onValueChange={onMonthChange}>
          <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-primary/20">
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem 
                key={i + 1} 
                value={String(i + 1)}
                className="hover:bg-primary/10"
              >
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Select onValueChange={onYearChange}>
          <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-primary/20">
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem 
                key={2024 + i} 
                value={String(2024 + i)}
                className="hover:bg-primary/10"
              >
                {2024 + i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MonthYearSelector;