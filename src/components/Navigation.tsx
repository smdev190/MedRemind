
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, MessageSquare, User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-3xl mx-auto">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-150 ease-in-out ${
            isActive('/') 
            ? 'text-blue-500 dark:text-blue-400' 
            : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link
          to="/calendar"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-150 ease-in-out ${
            isActive('/calendar') 
            ? 'text-blue-500 dark:text-blue-400' 
            : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
          }`}
        >
          <Calendar size={20} />
          <span className="text-xs mt-1">Calendar</span>
        </Link>
        
        <Link
          to="/chat"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-150 ease-in-out ${
            isActive('/chat') 
            ? 'text-blue-500 dark:text-blue-400' 
            : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
          }`}
        >
          <MessageSquare size={20} />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-150 ease-in-out ${
            isActive('/profile') 
            ? 'text-blue-500 dark:text-blue-400' 
            : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
