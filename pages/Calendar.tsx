
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { sampleMedications } from '../data/medicationData';
import { format, getDay, startOfMonth, eachDayOfInterval, endOfMonth } from 'date-fns'; // Added date-fns imports
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/Navigation';

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date()); // For selected day details
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date()); // For calendar view
  const [daysWithMedications, setDaysWithMedications] = useState<Date[]>([]);
  const [medicationsForDate, setMedicationsForDate] = useState(sampleMedications); // This might need re-evaluation based on selected date

  const getDayName = (d: Date): string => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[getDay(d)];
  };

  // Calculate days with medications for the current visible month
  useEffect(() => {
    const monthStart = startOfMonth(currentCalendarMonth);
    const monthEnd = endOfMonth(currentCalendarMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const scheduledDates: Date[] = [];
    daysInMonth.forEach(dayInMonth => {
      const dayName = getDayName(dayInMonth);
      const hasMedicationOnDay = sampleMedications.some(med =>
        med.schedule.some(scheduleItem => scheduleItem.days.includes(dayName))
      );
      if (hasMedicationOnDay) {
        scheduledDates.push(dayInMonth);
      }
    });
    setDaysWithMedications(scheduledDates);
  }, [currentCalendarMonth, sampleMedications]);
  
  // Update medications list when a specific date is selected
  useEffect(() => {
    // Filter medications for the selected date
    // In a real app, this would filter based on actual scheduled dates for *that specific day*
    // For this demo, we'll check if the selected day *could* have meds based on weekly schedule
    // and then randomly assign status for simplicity if not today.
    const dayNameSelected = getDayName(date);
    const filtered = sampleMedications
      .filter(med => med.schedule.some(s => s.days.includes(dayNameSelected)))
      .map(med => ({
        ...med,
        status: isToday(date) ? med.status : Math.random() > 0.2 ? 'completed' : Math.random() > 0.5 ? 'missed' : 'upcoming',
      }));
    
    setMedicationsForDate(filtered);
  }, [date, sampleMedications]);
  
  const isToday = (d: Date) => {
    const today = new Date();
    return d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
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
        <div className="med-card">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            month={currentCalendarMonth}
            onMonthChange={setCurrentCalendarMonth}
            modifiers={{ hasEvents: daysWithMedications }}
            modifiersClassNames={{ hasEvents: 'day-has-events' }}
            className="rounded-md p-3 pointer-events-auto w-full"
          />
        </div>
        
        <div className="mt-6">
          <h2 className="med-subheader dark:text-white">
            Medications for {format(date, 'MMMM d, yyyy')}
          </h2>
          
          <div className="med-card">
            {medicationsForDate.length > 0 ? (
              <div className="space-y-4">
                {medicationsForDate.map((med, index) => (
                  <React.Fragment key={med.id}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium dark:text-white">{med.name}</h3>
                        <p className="text-sm text-med-gray dark:text-gray-400">
                          {med.dosage} - {med.schedule[0]?.time || 'N/A'} {/* Handle cases with no schedule time */}
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
                No medications for {format(date, 'MMMM d')} based on schedule.
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
