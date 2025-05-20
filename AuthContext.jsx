import React, { createContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getStoredUser, storeUser, removeUser as removeStoredUser } from '@/services/localStorage';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (usernameOrEmail, password) => {
    try {
      // Mock login: In a real app, replace with API call to Supabase/backend
      // For KSRTC, username might be specific controller ID.
      // We'll accept any username for now if password is 'password'
      if (usernameOrEmail && password === 'password') { // Simplified mock login
        const mockUser = {
          id: 'controller-' + Math.random().toString(36).substr(2, 9),
          username: usernameOrEmail, // Store as username
          email: `${usernameOrEmail}@ksrtc.example.com`, // Create a dummy email if needed
          name: usernameOrEmail, // Display name
          avatar: null, 
        };
        
        setUser(mockUser);
        storeUser(mockUser); // Use service
        
        return { success: true };
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, name) => {
    // Registration might not be applicable for KSRTC controllers in this public app
    // If needed, this would be an admin function or pre-provisioned accounts
    toast({
      title: "Registration Not Available",
      description: "Controller accounts are managed by KSRTC administration.",
      variant: "destructive",
    });
    return { success: false, error: "Registration not available" };
  };

  const logout = () => {
    setUser(null);
    removeStoredUser(); // Use service
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = (userData) => {
    try {
      if (!user) throw new Error("User not logged in.");
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      storeUser(updatedUser); // Use service
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.message || "An error occurred while updating your profile.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};