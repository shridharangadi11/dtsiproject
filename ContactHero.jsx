import React from 'react';
import { motion } from 'framer-motion';

const ContactHero = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Have questions or need assistance? We're here to help. Reach out to our team.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;