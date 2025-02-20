
import React from 'react';
import { Card } from "@/components/ui/card";

interface CalendarEvent {
  month: string;
  activities: string[];
  alerts: string[];
}

const CropCalendar = ({ cropName }: { cropName: string }) => {
  const getCalendarData = (crop: string): CalendarEvent[] => {
    const calendar: Record<string, CalendarEvent[]> = {
      'rice': [
        { month: 'Jan', activities: ['Land preparation', 'Seed selection'], alerts: ['Plan irrigation'] },
        { month: 'Feb', activities: ['Sowing', 'Apply base fertilizer'], alerts: ['Monitor water levels'] },
        { month: 'Mar', activities: ['Weeding', 'Pest monitoring'], alerts: ['Check for insects'] },
        { month: 'Apr', activities: ['Apply fertilizer', 'Disease control'], alerts: ['Watch humidity levels'] },
        { month: 'May', activities: ['Monitor growth', 'Water management'], alerts: ['Prepare for harvest'] },
        { month: 'Jun', activities: ['Harvesting', 'Post-harvest handling'], alerts: ['Check market prices'] }
      ],
      'default': [
        { month: 'Month 1', activities: ['Land preparation', 'Soil testing'], alerts: [] },
        { month: 'Month 2', activities: ['Sowing', 'Initial care'], alerts: [] },
        { month: 'Month 3', activities: ['Growth monitoring', 'Maintenance'], alerts: [] },
        { month: 'Month 4', activities: ['Pre-harvest preparation', 'Marketing'], alerts: [] }
      ]
    };

    return calendar[crop.toLowerCase()] || calendar.default;
  };

  const calendarData = getCalendarData(cropName);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Crop Calendar</h3>
      <div className="space-y-4">
        {calendarData.map((event, index) => (
          <div key={index} className="border-b last:border-b-0 pb-3">
            <h4 className="font-medium text-primary">{event.month}</h4>
            <div className="mt-2 space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Activities:</p>
                <ul className="list-disc list-inside text-sm pl-2">
                  {event.activities.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </div>
              {event.alerts.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-orange-600">Alerts:</p>
                  <ul className="list-disc list-inside text-sm pl-2 text-orange-600">
                    {event.alerts.map((alert, idx) => (
                      <li key={idx}>{alert}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CropCalendar;
