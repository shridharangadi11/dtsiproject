import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const KsrtcLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '', // Changed from email
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { username, password } = formData;
      
      if (!username || !password) {
        throw new Error('Please fill in all fields');
      }
      
      // Using username as email for the AuthContext login function
      const result = await login(username, password); 
      
      if (result.success) {
        toast({ title: "Login Successful", description: `Welcome, ${username}!`});
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img  src="/ksrtc-logo.png" alt="KSRTC Logo" className="h-12 md:h-16 w-auto" src="https://images.unsplash.com/photo-1607013078899-f3458a065618" />
          <span className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">
            Karnataka State Road Transport Corporation
          </span>
        </div>
        <RadioGroup defaultValue="english" className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="english" id="lang-en-login" />
            <Label htmlFor="lang-en-login" className="text-sm font-medium text-gray-700 dark:text-gray-300">English</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="kannada" id="lang-kn-login" />
            <Label htmlFor="lang-kn-login" className="text-sm font-medium text-gray-700 dark:text-gray-300">ಕನ್ನಡ</Label>
          </div>
        </RadioGroup>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-8 relative"
      >
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <img  src="/ksrtc-emblem-bg.png" alt="KSRTC Emblem Background" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1572370519892-1ee8950c47f7" />
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Controller Login</h1>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </motion.div>
      <footer className="absolute bottom-0 p-4 text-center w-full text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} KSRTC. All rights reserved.
      </footer>
    </div>
  );
};

export default KsrtcLoginPage;