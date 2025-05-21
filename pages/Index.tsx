
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, Check } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { sampleMedications } from '../data/medicationData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric' 
  });
  
  // Calculate progress for today
  const totalMeds = sampleMedications.length;
  const upcomingMeds = sampleMedications.filter(med => med.status === 'upcoming').length;
  const completedMeds = sampleMedications.filter(med => med.status === 'completed').length;
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      <div className="container mx-auto max-w-3xl px-4 py-4">
        {/* App Title and Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-med-blue dark:text-blue-400">MedRemind</h1>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Hello, Sarah</p>
        </div>
        
        {/* Today's Overview */}
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Today's Overview</h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">{formattedDate}</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
              <span className="text-xs text-white">{upcomingMeds}</span>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">medications remaining today</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
              <span className="text-xs text-white">{completedMeds}</span>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">medications taken</span>
          </div>
        </div>
        
        {/* Upcoming Medications */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Upcoming Medications</h2>
          
          {/* Medication Cards */}
          {sampleMedications.map((med) => (
            <Link to={`/medication/${med.id}`} key={med.id} className="block mb-4">
              <Card className={`overflow-hidden ${med.status === 'upcoming' ? 'bg-blue-500 text-white dark:bg-blue-600' : 'bg-white dark:bg-gray-800'}`}>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{med.name} {med.dosage}</h3>
                      <p className="text-sm opacity-90">
                        {med.instructions.split('|')[0]} | {med.instructions.split('|')[1] || '1 tablet'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{med.schedule[0].time}</p>
                      <p className="text-xs opacity-75">in 20 min</p>
                    </div>
                  </div>
                  
                  {med.status === 'upcoming' && (
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
                  
                  {med.status === 'missed' && (
                    <div className="flex items-center mt-2">
                      <Badge variant="destructive" className="flex items-center text-xs">
                        Missed
                      </Badge>
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
          
          {/* Add Medication Button */}
          <Link to="/add-medication" className="block mt-6">
            <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 w-full flex items-center justify-center py-6">
              <Plus size={20} className="mr-2" />
              Add Medication
            </Button>
          </Link>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Index;
