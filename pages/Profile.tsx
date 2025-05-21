
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  // Apply dark mode when component mounts and when preference changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    // In a real app, this would clear auth state
  };
  
  return (
    <div className="min-h-screen bg-med-light-gray dark:bg-gray-900">
      <Header title="Profile" showBack showHome />
      
      <div className="med-container">
        {/* User Info */}
        <div className="med-card flex items-center dark:bg-gray-800 dark:border-gray-700">
          <div className="w-16 h-16 rounded-full bg-med-blue flex items-center justify-center text-white font-bold text-xl">
            JD
          </div>
          <div className="ml-4">
            <h2 className="font-bold text-xl dark:text-white">John Doe</h2>
            <p className="text-med-gray dark:text-gray-400">john.doe@example.com</p>
          </div>
        </div>
        
        {/* Medication Stats */}
        <div className="med-card mt-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="med-subheader mb-4 dark:text-white">Medication Adherence</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-bold text-2xl text-med-blue">92%</p>
              <p className="text-sm text-med-gray dark:text-gray-400">This Week</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-med-green">88%</p>
              <p className="text-sm text-med-gray dark:text-gray-400">This Month</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-med-gray">90%</p>
              <p className="text-sm text-med-gray dark:text-gray-400">All Time</p>
            </div>
          </div>
        </div>
        
        {/* Settings */}
        <div className="med-card mt-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="med-subheader mb-2 dark:text-white">Settings</h3>
          <div className="space-y-3">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                {isDarkMode ? (
                  <Moon className="h-5 w-5 mr-2 text-med-gray dark:text-gray-400" />
                ) : (
                  <Sun className="h-5 w-5 mr-2 text-med-gray" />
                )}
                <span className="dark:text-white">Dark Mode</span>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
            <Separator />
            
            <button className="w-full text-left py-2 hover:text-med-blue transition-colors dark:text-white dark:hover:text-med-blue">
              Notification Preferences
            </button>
            <Separator />
            <button className="w-full text-left py-2 hover:text-med-blue transition-colors dark:text-white dark:hover:text-med-blue">
              Privacy Settings
            </button>
            <Separator />
            <button className="w-full text-left py-2 hover:text-med-blue transition-colors dark:text-white dark:hover:text-med-blue">
              Accessibility Options
            </button>
            <Separator />
            <button className="w-full text-left py-2 hover:text-med-blue transition-colors dark:text-white dark:hover:text-med-blue">
              Contact Healthcare Provider
            </button>
          </div>
        </div>
        
        {/* Emergency Contacts */}
        <div className="med-card mt-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="med-subheader mb-2 dark:text-white">Emergency Contacts</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="font-medium dark:text-white">Dr. Sarah Smith</p>
                <p className="text-sm text-med-gray dark:text-gray-400">Primary Care</p>
              </div>
              <Button variant="ghost" size="sm" className="text-med-blue">
                Call
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between">
              <div>
                <p className="font-medium dark:text-white">Michael Doe</p>
                <p className="text-sm text-med-gray dark:text-gray-400">Family Contact</p>
              </div>
              <Button variant="ghost" size="sm" className="text-med-blue">
                Call
              </Button>
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full mt-8 h-12 text-med-red border-med-red hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
