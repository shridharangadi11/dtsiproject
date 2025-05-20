import React from 'react';
import { motion } from 'framer-motion';

const FaqListSection = () => {
  const faqs = [
    { question: "How quickly can I get started?", answer: "Sign up is immediate. Setup is quick and intuitive." },
    { question: "Do you offer customer support?", answer: "Yes, 24/7 support via email and chat." },
    { question: "Can I cancel my subscription anytime?", answer: "Absolutely. No long-term contracts or hidden fees." },
    { question: "Is my data secure?", answer: "Yes, we use industry-standard encryption and security measures." },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Answers to common questions about our services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqListSection;