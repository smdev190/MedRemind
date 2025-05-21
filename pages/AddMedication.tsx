
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sampleMedications, MedicationType } from '../data/medicationData';

const AddMedication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [scheduleTime, setScheduleTime] = useState('08:00');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [refillDate, setRefillDate] = useState('');
  const [pillsRemaining, setPillsRemaining] = useState('30');
  
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !dosage) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Create new medication object
    const newMedication: MedicationType = {
      id: `${Date.now()}`,
      name,
      dosage,
      instructions,
      schedule: [
        {
          time: scheduleTime,
          days: selectedDays.length > 0 
            ? selectedDays 
            : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        }
      ],
      refill: {
        date: refillDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        remaining: parseInt(pillsRemaining) || 30
      },
      status: 'upcoming'
    };
    
    // Add to our sample medications (in a real app, this would be saved to a database)
    sampleMedications.unshift(newMedication);
    
    toast({
      title: "Medication added",
      description: `${name} has been added to your medications`,
      duration: 3000, // Auto-dismiss after 3 seconds
    });
    
    navigate('/');
  };
  
  const dayAbbreviations = [
    { abbr: 'S', full: 'Sunday' },
    { abbr: 'M', full: 'Monday' },
    { abbr: 'T', full: 'Tuesday' },
    { abbr: 'W', full: 'Wednesday' },
    { abbr: 'T', full: 'Thursday' },
    { abbr: 'F', full: 'Friday' },
    { abbr: 'S', full: 'Saturday' }
  ];
  
  return (
    <div className="min-h-screen bg-med-light-gray dark:bg-gray-900">
      <Header title="Add Medication" showBack showHome />
      
      <div className="med-container">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="med-card dark:bg-gray-800 dark:border-gray-700">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-med-dark-gray dark:text-gray-300">
                  Medication Name*
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Lisinopril"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="dosage" className="text-med-dark-gray dark:text-gray-300">
                  Dosage*
                </Label>
                <Input
                  id="dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g., 10mg"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="instructions" className="text-med-dark-gray dark:text-gray-300">
                  Instructions
                </Label>
                <Textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g., Take with food"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          
          <div className="med-card dark:bg-gray-800 dark:border-gray-700">
            <h2 className="med-subheader mb-4 dark:text-white">Schedule</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="time" className="text-med-dark-gray dark:text-gray-300">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label className="text-med-dark-gray dark:text-gray-300 mb-2 block">
                  Days
                </Label>
                <div className="grid grid-cols-7 gap-1">
                  {dayAbbreviations.map((day, index) => (
                    <div 
                      key={index}
                      onClick={() => toggleDay(day.full)}
                      className={`aspect-square flex items-center justify-center rounded-full border ${
                        selectedDays.includes(day.full) 
                          ? 'bg-med-blue dark:bg-blue-600 text-white' 
                          : 'border-med-blue bg-blue-50 dark:bg-blue-900/30 text-med-blue dark:text-blue-400'
                      } font-medium cursor-pointer hover:bg-med-blue hover:text-white dark:hover:bg-blue-600 transition-colors`}
                    >
                      {day.abbr}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="med-card dark:bg-gray-800 dark:border-gray-700">
            <h2 className="med-subheader mb-4 dark:text-white">Refill Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="refillDate" className="text-med-dark-gray dark:text-gray-300">
                  Next Refill Date
                </Label>
                <Input
                  id="refillDate"
                  type="date"
                  className="mt-1"
                  value={refillDate}
                  onChange={(e) => setRefillDate(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="remaining" className="text-med-dark-gray dark:text-gray-300">
                  Pills Remaining
                </Label>
                <Input
                  id="remaining"
                  type="number"
                  min="0"
                  className="mt-1"
                  placeholder="30"
                  value={pillsRemaining}
                  onChange={(e) => setPillsRemaining(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              type="button" 
              variant="outline"
              className="flex-1 h-12 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-med-blue hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 h-12"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedication;
