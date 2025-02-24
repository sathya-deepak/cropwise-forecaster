
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Video, MessageSquare } from 'lucide-react';

interface Expert {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  available: string;
  image: string;
}

const experts: Expert[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Soil Science",
    rating: 4.8,
    available: "Today, 2:00 PM",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    specialization: "Crop Disease",
    rating: 4.9,
    available: "Tomorrow, 10:00 AM",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    specialization: "Sustainable Farming",
    rating: 4.7,
    available: "Today, 4:30 PM",
    image: "/placeholder.svg"
  }
];

const ExpertConsultation = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Expert Consultation</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {experts.map((expert) => (
          <Card key={expert.id} className="p-4">
            <div className="flex items-start space-x-4">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{expert.name}</h3>
                <p className="text-sm text-gray-600">{expert.specialization}</p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm ml-1">{expert.rating}</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Available: {expert.available}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1">
                <Video className="w-4 h-4 mr-2" />
                Video Call
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ExpertConsultation;
