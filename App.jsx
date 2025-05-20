
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Pages
import KsrtcLoginPage from '@/pages/ksrtc/KsrtcLoginPage';
import KsrtcDashboardPage from '@/pages/ksrtc/KsrtcDashboardPage';
import KsrtcFeedbackPage from '@/pages/ksrtc/KsrtcFeedbackPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';

// Context
import { AuthProvider, AuthContext } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext'; // Import LanguageProvider

const App = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to KSRTC Controller Portal!",
        description: "Please log in to continue.",
        duration: 5000,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold">Loading KSRTC Portal...</h2>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<KsrtcLoginPage />} />
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/login" replace />} />
                <Route path="dashboard" element={
                  <ProtectedRoute>
                    <KsrtcDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="feedback" element={
                  <ProtectedRoute>
                    <KsrtcFeedbackPage />
                  </ProtectedRoute>
                } />
                <Route path="profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Router>
        <Toaster />
      </LanguageProvider>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const authContext = React.useContext(AuthContext);

  if (!authContext) {
    console.error("AuthContext is undefined, make sure you are wrapping your component with AuthProvider.");
    return <Navigate to="/login" replace />;
  }

  const { user, loading } = authContext;
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default App;
