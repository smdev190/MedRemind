
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, Info, Check, Edit } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { sampleMedications, MedicationType } from '../data/medicationData';

const MedicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [medication, setMedication] = useState<MedicationType | undefined>(
    sampleMedications.find(med => med.id === id)
  );
  const [medicationStatus, setMedicationStatus] = useState(medication?.status || 'upcoming');
  
  // Update medication if sampleMedications changes (e.g., after an edit)
  useEffect(() => {
    const updatedMed = sampleMedications.find(med => med.id === id);
    if (updatedMed) {
      setMedication(updatedMed);
      setMedicationStatus(updatedMed.status);
    }
  }, [id, sampleMedications]);

  if (!medication) {
    return (
      <div className="min-h-screen bg-med-light-gray dark:bg-gray-900">
        <Header title="Not Found" showBack showHome />
        <div className="med-container text-center">
          <p className="text-med-gray dark:text-gray-400 mb-4">Medication not found</p>
          <Button onClick={() => navigate('/')} className="dark:bg-blue-600 dark:hover:bg-blue-700">Go Back Home</Button>
        </div>
      </div>
    );
  }
  
  const handleMarkAsTaken = () => {
    // Update in sample data
    const index = sampleMedications.findIndex(med => med.id === id);
    if (index !== -1) {
      sampleMedications[index] = {
        ...sampleMedications[index],
        status: 'completed'
      };
    }
    
    setMedicationStatus('completed');
    toast({
      title: "Medication marked as taken",
      description: `You've marked ${medication.name} as taken.`,
      duration: 3000,
    });
  };
  
  const handleEdit = () => {
    navigate(`/edit-medication/${medication.id}`);
  };
  
  const getStatusIcon = () => {
    switch (medicationStatus) {
      case 'completed':
        return <div className="w-12 h-12 rounded-full bg-med-green dark:bg-green-600 flex items-center justify-center text-white"><Check size={24} /></div>;
      case 'upcoming':
        return <div className="w-12 h-12 rounded-full bg-med-blue dark:bg-blue-600 flex items-center justify-center text-white"><Clock size={24} /></div>;
      case 'missed':
        return <div className="w-12 h-12 rounded-full bg-med-red dark:bg-red-600 flex items-center justify-center text-white"><Info size={24} /></div>;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (medicationStatus) {
      case 'completed':
        return 'Taken';
      case 'upcoming':
        return 'Upcoming';
      case 'missed':
        return 'Missed';
      default:
        return '';
    }
  };
  
  return (
    <div className="min-h-screen bg-med-light-gray dark:bg-gray-900">
      <Header title="Medication Details" showBack showHome />
      
      <div className="med-container">
        {/* Medication Status */}
        <div className="med-card flex items-center dark:bg-gray-800 dark:border-gray-700">
          {getStatusIcon()}
          <div className="ml-4">
            <h2 className="text-xl font-bold dark:text-white">{medication.name}</h2>
            <p className="text-med-gray dark:text-gray-400">Status: <span className="font-medium">{getStatusText()}</span></p>
          </div>
        </div>
        
        {/* Medication Details */}
        <div className="med-card mt-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="med-subheader mb-4 dark:text-white">Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-med-gray dark:text-gray-400">Dosage</p>
              <p className="font-medium dark:text-white">{medication.dosage}</p>
            </div>
            <div>
              <p className="text-sm text-med-gray dark:text-gray-400">Instructions</p>
              <p className="font-medium dark:text-white">{medication.instructions}</p>
            </div>
          </div>
        </div>
        
        {/* Schedule */}
        <div className="med-card mt-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <Clock size={18} className="text-med-blue dark:text-blue-400 mr-2" />
            <h3 className="med-subheader mb-0 dark:text-white">Schedule</h3>
          </div>
          <div className="space-y-4">
            {medication.schedule.map((schedule, index) => (
              <div key={index} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-b-0">
                <p className="font-semibold text-med-blue dark:text-blue-400">{schedule.time}</p>
                <p className="text-sm text-med-gray dark:text-gray-400 mt-1">
                  {schedule.days.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Refill Information */}
        <div className="med-card mt-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <Calendar size={18} className="text-med-blue dark:text-blue-400 mr-2" />
            <h3 className="med-subheader mb-0 dark:text-white">Refill Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-med-gray dark:text-gray-400">Next Refill</p>
              <p className="font-medium dark:text-white">
                {new Date(medication.refill.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-med-gray dark:text-gray-400">Pills Remaining</p>
              <p className={`font-medium ${medication.refill.remaining <= 5 ? 'text-med-orange dark:text-orange-400' : 'dark:text-white'}`}>
                {medication.refill.remaining} pills
              </p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8">
          <Button 
            variant="outline" 
            className="flex-1 h-12 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            onClick={handleEdit}
          >
            <Edit size={18} className="mr-2" />
            Edit
          </Button>
          {medicationStatus !== 'completed' && (
            <Button 
              className="flex-1 bg-med-green hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 h-12"
              onClick={handleMarkAsTaken}
            >
              <Check size={18} className="mr-2" />
              Mark as Taken
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationDetail;
