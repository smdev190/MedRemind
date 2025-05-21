
import { useNavigate } from 'react-router-dom';
import { Check, Clock, Info, AlertCircle } from 'lucide-react';
import { MedicationType } from '../data/medicationData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MedicationCardProps {
  medication: MedicationType;
}

const MedicationCard = ({ medication }: MedicationCardProps) => {
  const navigate = useNavigate();
  
  const handleMedicationClick = () => {
    navigate(`/medication/${medication.id}`);
  };
  
  const StatusIcon = () => {
    switch (medication.status) {
      case 'completed':
        return <Check size={14} className="mr-1" />;
      case 'upcoming':
        return <Clock size={14} className="mr-1" />;
      case 'missed':
        return <AlertCircle size={14} className="mr-1" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = () => {
    switch (medication.status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'missed':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return '';
    }
  };
  
  const getStatusText = () => {
    switch (medication.status) {
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
  
  // Get the next scheduled time
  const getNextScheduledTime = () => {
    if (medication.schedule.length > 0) {
      return medication.schedule[0].time;
    }
    return '';
  };

  return (
    <Card 
      className={medication.status === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800'} 
      onClick={handleMedicationClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{medication.name} {medication.dosage}</h3>
            <p className="text-sm opacity-90">{medication.instructions}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{getNextScheduledTime()}</p>
            <p className="text-xs opacity-75">in 20 min</p>
          </div>
        </div>
        
        {medication.status === 'upcoming' && (
          <div className="flex gap-2 mt-3">
            <Button variant="outline" className="flex-1 bg-white text-blue-500 hover:bg-gray-100 hover:text-blue-600">
              <Check size={16} className="mr-1" />
              Take
            </Button>
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
              Snooze
            </Button>
          </div>
        )}
        
        {medication.status === 'missed' && (
          <div className="mt-3">
            <Badge variant="destructive" className="text-xs">
              <StatusIcon />
              {getStatusText()}
            </Badge>
          </div>
        )}
        
        {medication.refill.remaining <= 5 && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800">
              {medication.refill.remaining} pills left
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MedicationCard;
