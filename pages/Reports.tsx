
import React from 'react';
import Header from '@/components/Header';
import { sampleMedications } from '../data/medicationData';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';

const Reports = () => {
  // Generate weekly adherence data
  const weeklyData = [
    { name: 'Mon', adherence: 100 },
    { name: 'Tue', adherence: 90 },
    { name: 'Wed', adherence: 100 },
    { name: 'Thu', adherence: 80 },
    { name: 'Fri', adherence: 100 },
    { name: 'Sat', adherence: 85 },
    { name: 'Sun', adherence: 90 },
  ];

  // Generate monthly adherence data
  const monthlyData = [
    { name: 'Week 1', adherence: 92 },
    { name: 'Week 2', adherence: 88 },
    { name: 'Week 3', adherence: 95 },
    { name: 'Week 4', adherence: 90 },
  ];

  // Medication-specific adherence
  const medicationAdherence = sampleMedications.map(med => ({
    name: med.name,
    adherence: Math.floor(Math.random() * 20) + 80, // Random adherence between 80-100%
  }));

  const chartConfig = {
    adherence: {
      label: "Adherence %",
      theme: {
        light: "#3B82F6",  // med-blue
        dark: "#60A5FA",   // lighter blue for dark mode
      }
    }
  };

  return (
    <div className="min-h-screen bg-med-light-gray dark:bg-gray-900">
      <Header title="Reports" showBack showHome />
      
      <div className="med-container">
        {/* Weekly Adherence */}
        <div className="med-card dark:bg-gray-800 dark:border-gray-700">
          <h3 className="med-subheader dark:text-white">Weekly Adherence</h3>
          <div className="h-64">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="adherence" 
                  name="adherence"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
        
        {/* Monthly Adherence */}
        <div className="med-card mt-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="med-subheader dark:text-white">Monthly Adherence</h3>
          <div className="h-64">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="adherence" 
                  name="adherence"
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
        
        {/* Medication-Specific Adherence */}
        <div className="med-card mt-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="med-subheader dark:text-white">Medication Adherence</h3>
          <div className="h-64">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart 
                data={medicationAdherence} 
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="adherence" 
                  name="adherence"
                  fill="#3B82F6" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
