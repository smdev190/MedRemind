
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { sampleMedications, MedicationType } from '../data/medicationData';

const EditMedication = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [scheduleTime, setScheduleTime] = useState('08:00');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [refillDate, setRefillDate] = useState('');
  const [pillsRemaining, setPillsRemaining] = useState('');
  
  useEffect(() => {
    // Find medication with the given ID
    const medication = sampleMedications.find(med => med.id === id);
    
    if (!medication) {
      toast({
        title: "Error",
        description: "Medication not found",
        variant: "destructive",
        duration: 3000,
      });
      navigate('/');
      return;
    }
    
    // Populate form with medication data
    setName(medication.name);
    setDosage(medication.dosage);
    setInstructions(medication.instructions);
    
    if (medication.schedule.length > 0) {
      setScheduleTime(medication.schedule[0].time);
      setSelectedDays(medication.schedule[0].days);
    }
    
    setRefillDate(medication.refill.date);
    setPillsRemaining(medication.refill.remaining.toString());
  }, [id, navigate, toast]);
  
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
        duration: 3000,
      });
      return;
    }
    
    // Update medication object
    const updatedMedication: MedicationType = {
      id: id || '',
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
        date: refillDate,
        remaining: parseInt(pillsRemaining) || 0
      },
      status: 'upcoming' // Keep existing status or set to default
    };
    
    // Find and update the medication in our sample data
    const index = sampleMedications.findIndex(med => med.id === id);
    if (index !== -1) {
      // Preserve the status
      updatedMedication.status = sampleMedications[index].status;
      sampleMedications[index] = updatedMedication;
    }
    
    toast({
      title: "Medication updated",
      description: `${name} has been updated successfully`,
      duration: 3000,
    });
    
    navigate(`/medication/${id}`);
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
      <Header title="Edit Medication" showBack showHome />
      
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
                  value={refillDate}
                  onChange={(e) => setRefillDate(e.target.value)}
                  className="mt-1"
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
                  value={pillsRemaining}
                  onChange={(e) => setPillsRemaining(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              type="button" 
              variant="outline"
              className="flex-1 h-12 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              onClick={() => navigate(`/medication/${id}`)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-med-blue hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 h-12"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMedication;
