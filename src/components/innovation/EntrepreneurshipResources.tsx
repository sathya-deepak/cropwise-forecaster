
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, File, Video, Users, Calendar, Download } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'template' | 'course';
  source: string;
  link: string;
  date: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "How to Start an Agricultural Business",
    description: "A comprehensive guide for new farmers looking to start a profitable agricultural venture.",
    type: "article",
    source: "Krishi Jagran",
    link: "#",
    date: "2023-05-15"
  },
  {
    id: 2,
    title: "Farm Business Plan Template",
    description: "A ready-to-use template to create a detailed business plan for your farm enterprise.",
    type: "template",
    source: "Agricultural Ministry",
    link: "#",
    date: "2023-02-21"
  },
  {
    id: 3,
    title: "Modern Farming Techniques for Entrepreneurs",
    description: "Video course covering innovative farming methods that boost productivity and profits.",
    type: "video",
    source: "AgriTech Academy",
    link: "#",
    date: "2023-07-10"
  },
  {
    id: 4,
    title: "Financial Management for Small-Scale Farmers",
    description: "Learn how to manage farm finances, track expenses, and plan for sustainable growth.",
    type: "course",
    source: "Rural Development Institute",
    link: "#",
    date: "2023-08-05"
  },
  {
    id: 5,
    title: "Market Analysis for Agricultural Products",
    description: "Guide to analyzing market demand, pricing strategies, and distribution channels.",
    type: "article",
    source: "Farmer's Journal",
    link: "#",
    date: "2023-06-30"
  },
  {
    id: 6,
    title: "Cost Calculation Spreadsheet",
    description: "Excel template for calculating production costs and determining profitable pricing.",
    type: "template",
    source: "Agricultural Economics Dept.",
    link: "#",
    date: "2023-03-15"
  },
  {
    id: 7,
    title: "Sustainable Farming Business Models",
    description: "Video series exploring profitable sustainable farming approaches with case studies.",
    type: "video",
    source: "Eco-Agri Network",
    link: "#",
    date: "2023-04-22"
  },
  {
    id: 8,
    title: "Digital Marketing for Farm Products",
    description: "Learn how to effectively market your agricultural products online to reach more customers.",
    type: "course",
    source: "Digital Farming Academy",
    link: "#",
    date: "2023-09-01"
  }
];

const events = [
  {
    title: "Agricultural Startup Summit",
    date: "October 15-16, 2023",
    location: "Delhi",
    description: "Conference for agricultural entrepreneurs featuring investors, experts, and networking opportunities."
  },
  {
    title: "Farm Innovation Workshop",
    date: "November 5, 2023",
    location: "Mumbai",
    description: "Hands-on workshop on implementing innovative technologies in farming operations."
  },
  {
    title: "Rural Entrepreneurship Bootcamp",
    date: "December 10-12, 2023",
    location: "Bangalore",
    description: "Three-day intensive training for aspiring rural entrepreneurs in agriculture sector."
  }
];

const EntrepreneurshipResources = () => {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Entrepreneurship Resources
        </h3>
        <p className="text-sm text-gray-500">Learning materials and tools for agricultural business development</p>
      </div>
      
      <CardContent className="p-6">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="articles" className="flex items-center gap-1">
              <File className="w-4 h-4" /> Articles
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-1">
              <Video className="w-4 h-4" /> Videos
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-1">
              <Download className="w-4 h-4" /> Templates
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles" className="space-y-4">
            {resources.filter(r => r.type === 'article' || r.type === 'course').map(resource => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{resource.title}</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {resource.type === 'article' ? 'Article' : 'Course'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Source: {resource.source}</span>
                  <span>Published: {new Date(resource.date).toLocaleDateString()}</span>
                </div>
                <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 mt-2 h-auto">
                  Read more
                </Button>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-4">
            {resources.filter(r => r.type === 'video').map(resource => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{resource.title}</h4>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Video</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Source: {resource.source}</span>
                  <span>Published: {new Date(resource.date).toLocaleDateString()}</span>
                </div>
                <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 mt-2 h-auto">
                  Watch video
                </Button>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            {resources.filter(r => r.type === 'template').map(resource => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{resource.title}</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Template</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Source: {resource.source}</span>
                  <span>Published: {new Date(resource.date).toLocaleDateString()}</span>
                </div>
                <Button variant="outline" className="mt-2 text-sm">
                  <Download className="w-4 h-4 mr-2" /> Download Template
                </Button>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium">{event.title}</h4>
                <div className="flex items-center gap-4 my-2">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {event.date}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {event.location}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm">Register</Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center justify-between">
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" /> Join Agricultural Entrepreneurs Network
            </h4>
            <p className="text-sm text-gray-600">
              Connect with fellow agricultural entrepreneurs for mentorship, collaboration, and support.
            </p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Join Network</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EntrepreneurshipResources;
