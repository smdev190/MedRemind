
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showHome?: boolean;
}

const Header = ({ title, showBack = false, showHome = false }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleHome = () => {
    navigate('/');
  };

  // Default to "MedRemind" if no title is provided
  const displayTitle = title || "MedRemind";

  return (
    <header className="flex items-center justify-between py-4 px-4 bg-white dark:bg-gray-800">
      <div className="flex items-center">
        {showBack && (
          <button 
            onClick={handleBack} 
            className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Go back"
          >
            <ArrowLeft size={24} className="text-med-dark-gray dark:text-gray-300" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-med-blue dark:text-blue-400">{displayTitle}</h1>
      </div>
      
      {showHome && location.pathname !== '/' && (
        <button 
          onClick={handleHome} 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Go to home"
        >
          <Home size={24} className="text-med-dark-gray dark:text-gray-300" />
        </button>
      )}
    </header>
  );
};

export default Header;
