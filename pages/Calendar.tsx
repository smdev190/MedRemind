
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { sampleMedications } from '../data/medicationData';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import Navigation from '../components/Navigation';

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [medicationsForDate, setMedicationsForDate] = useState(sampleMedications);
  
  // Update medications when date changes or when sampleMedications changes
  useEffect(() => {
    // Filter medications for the selected date
    // In a real app, this would filter based on actual scheduled dates
    const filtered = sampleMedications.map(med => ({
      ...med,
      // For demo, randomly assign a status for this date if it's not today
      status: isToday(date) ? med.status : Math.random() > 0.2 ? 'completed' : Math.random() > 0.5 ? 'missed' : 'upcoming'
    }));
    
    setMedicationsForDate(filtered);
  }, [date, sampleMedications]);
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'med-status-completed';
      case 'upcoming': return 'med-status-upcoming';
      case 'missed': return 'med-status-missed';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-med-light-gray dark:bg-gray-900 pb-16">
      <Header title="Calendar" showBack showHome />
      
      <div className="med-container">
        <div className="med-card dark:bg-gray-800 dark:border-gray-700">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md p-3 pointer-events-auto w-full"
          />
        </div>
        
        <div className="mt-6">
          <h2 className="med-subheader dark:text-white">
            Medications for {format(date, 'MMMM d, yyyy')}
          </h2>
          
          <div className="med-card dark:bg-gray-800 dark:border-gray-700">
            {medicationsForDate.length > 0 ? (
              <div className="space-y-4">
                {medicationsForDate.map((med, index) => (
                  <React.Fragment key={med.id}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium dark:text-white">{med.name}</h3>
                        <p className="text-sm text-med-gray dark:text-gray-400">
                          {med.dosage} - {med.schedule[0].time}
                        </p>
                      </div>
                      <div className={getStatusClass(med.status)}>
                        {med.status}
                      </div>
                    </div>
                    {index < medicationsForDate.length - 1 && <Separator className="dark:bg-gray-700" />}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <p className="text-center text-med-gray dark:text-gray-400">
                No medications scheduled for this date
              </p>
            )}
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Calendar;
