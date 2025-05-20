import React from 'react';
import { motion } from 'framer-motion';

const MapEmbedSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Location</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find us on the map and visit our office.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-lg h-96"
        >
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.01042938232423%2C40.70513108480546%2C-73.98262023925783%2C40.71946729386141&amp;layer=mapnik"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title="Office Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default MapEmbedSection;