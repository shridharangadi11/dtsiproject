
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, MessageSquare as MessageSquareText, UserCircle, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, getTranslation } from '@/contexts/LanguageContext';

const KsrtcHeader = ({ isDarkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, switchLanguage } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLanguageChange = (value) => {
    switchLanguage(value);
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <img  src="/ksrtc-logo.png" alt="KSRTC Logo" className="h-10 w-auto" src="https://images.unsplash.com/photo-1572370519892-1ee8950c47f7" />
            <span className="text-xl font-bold">
              {getTranslation(language, 'KSRTCControllerPortal')}
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <RadioGroup 
              defaultValue={language} 
              onValueChange={handleLanguageChange}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="en" id="lang-en" className="text-white border-white focus:ring-white data-[state=checked]:bg-white data-[state=checked]:text-blue-800" />
                <Label htmlFor="lang-en" className="text-sm font-medium">{getTranslation(language, 'English')}</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="kn" id="lang-kn" className="text-white border-white focus:ring-white data-[state=checked]:bg-white data-[state=checked]:text-blue-800" />
                <Label htmlFor="lang-kn" className="text-sm font-medium">{getTranslation(language, 'Kannada')}</Label>
              </div>
            </RadioGroup>

            <Button variant="ghost" size="sm" onClick={() => navigate('/feedback')} className="hover:bg-blue-700">
              <MessageSquareText className="h-5 w-5 mr-1" />
              {getTranslation(language, 'Feedback')}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={() => navigate('/profile')} className="hover:bg-blue-700">
              <UserCircle className="h-5 w-5 mr-1" />
              {user?.name || getTranslation(language, 'Profile')}
            </Button>

            <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-blue-700">
              <LogOut className="h-5 w-5 mr-1" />
              {getTranslation(language, 'Logout')}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hover:bg-blue-700"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default KsrtcHeader;
