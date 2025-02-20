
import React from 'react';
import { Card } from "@/components/ui/card";
import { Cloud, Sun, Droplets, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

const WeatherWidget = () => {
  // Mock weather data - in a real app, this would come from an API
  const weatherData: WeatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: 2.5,
    windSpeed: 12
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Local Weather Conditions</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Sun className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-medium">{weatherData.temperature}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-medium">{weatherData.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Rainfall</p>
            <p className="font-medium">{weatherData.rainfall} mm</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="text-cyan-500" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-medium">{weatherData.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;
