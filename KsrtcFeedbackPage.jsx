import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Assuming Textarea component exists or will be created
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';
import { storeData, getData } from '@/services/localStorage';

const KsrtcFeedbackPage = () => {
  const { toast } = useToast();
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      toast({
        title: "Empty Feedback",
        description: "Please write your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    
    try {
      const existingFeedback = getData('ksrtcFeedback') || [];
      const newFeedback = {
        id: Date.now(),
        text: feedbackText,
        submittedAt: new Date().toISOString(),
      };
      storeData('ksrtcFeedback', [...existingFeedback, newFeedback]);
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
      setFeedbackText('');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Could not submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">Feedback</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">We value your input. Please share your thoughts with us.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="feedback" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
              Submit Your Feedback
            </label>
            <Textarea
              id="feedback"
              name="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              required
              rows="8"
              className="w-full px-4 py-2 border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your feedback here..."
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default KsrtcFeedbackPage;