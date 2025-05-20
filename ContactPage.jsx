import React from 'react';
import { motion } from 'framer-motion';
import ContactHero from '@/pages/contact/ContactHero';
import ContactInfoSection from '@/pages/contact/ContactInfoSection';
import ContactFormSection from '@/pages/contact/ContactFormSection';
import MapEmbedSection from '@/pages/contact/MapEmbedSection';
import FaqListSection from '@/pages/contact/FaqListSection';

const ContactPage = () => {
  return (
    <div>
      <ContactHero />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfoSection />
            <ContactFormSection />
          </div>
        </div>
      </section>
      <MapEmbedSection />
      <FaqListSection />
    </div>
  );
};

export default ContactPage;