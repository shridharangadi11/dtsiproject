
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Coffee, Heart, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We're on a mission to help businesses and individuals build their digital presence with powerful, easy-to-use tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Founded in 2020, our company began with a simple idea: to make web development accessible to everyone, regardless of technical expertise.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                What started as a small team of passionate developers has grown into a global company serving thousands of customers worldwide.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Our platform continues to evolve, but our mission remains the same: to empower our users with the tools they need to succeed online.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <img  alt="Team working together in a modern office" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1573165231977-3f0e27806045" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">Est. 2020</p>
                <p>5+ Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              These core principles guide everything we do and every decision we make.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-blue-500" />,
                title: "Customer First",
                description: "Our customers are at the heart of everything we do. We listen, learn, and deliver solutions that meet their needs."
              },
              {
                icon: <Award className="h-10 w-10 text-purple-500" />,
                title: "Excellence",
                description: "We strive for excellence in all aspects of our work, from code quality to customer support."
              },
              {
                icon: <Heart className="h-10 w-10 text-red-500" />,
                title: "Passion",
                description: "We're passionate about technology and its potential to transform businesses and lives."
              },
              {
                icon: <Coffee className="h-10 w-10 text-yellow-500" />,
                title: "Innovation",
                description: "We continuously innovate and improve our platform to stay ahead of industry trends."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The talented people behind our success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "CEO & Founder",
                bio: "With over 15 years of experience in tech, Alex leads our company vision and strategy."
              },
              {
                name: "Maria Rodriguez",
                role: "CTO",
                bio: "Maria oversees our technical direction and ensures we're using the latest technologies."
              },
              {
                name: "David Chen",
                role: "Head of Design",
                bio: "David brings our products to life with beautiful, intuitive designs that users love."
              },
              {
                name: "Sarah Kim",
                role: "Head of Marketing",
                bio: "Sarah leads our marketing efforts, helping us connect with customers worldwide."
              },
              {
                name: "James Wilson",
                role: "Lead Developer",
                bio: "James ensures our codebase is robust, scalable, and follows best practices."
              },
              {
                name: "Priya Patel",
                role: "Customer Success Manager",
                bio: "Priya works closely with our customers to ensure they get the most out of our platform."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="aspect-square">
                  <img  alt={`${member.name}, ${member.role}`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1575383596664-30f4489f9786" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "10k+", label: "Customers" },
              { number: "50+", label: "Countries" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-xl">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
