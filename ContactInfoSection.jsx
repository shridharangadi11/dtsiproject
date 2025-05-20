import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfoSection = () => {
  const contactDetails = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      title: "Email Us",
      lines: [
        { label: "For general inquiries:", value: "info@webapp.com", link: "mailto:info@webapp.com" },
        { label: "For support:", value: "support@webapp.com", link: "mailto:support@webapp.com", mt: true },
      ],
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />,
      bgColor: "bg-green-100 dark:bg-green-900/30",
      title: "Call Us",
      lines: [
        { label: "Main Office:", value: "+1 (555) 123-4567", link: "tel:+15551234567" },
        { label: "Support Hotline:", value: "+1 (555) 987-6543", link: "tel:+15559876543", mt: true },
      ],
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      title: "Visit Us",
      lines: [
        { label: "Headquarters:", value: "123 Web Street\nDigital City, DC 10101\nUnited States" },
      ],
    },
  ];

  const businessHours = [
    "Monday - Friday: 9:00 AM - 6:00 PM EST",
    "Saturday: 10:00 AM - 4:00 PM EST",
    "Sunday: Closed",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
      <div className="space-y-8">
        {contactDetails.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`${item.bgColor} p-3 rounded-full`}>{item.icon}</div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              {item.lines.map((line, lineIdx) => (
                <div key={lineIdx} className={line.mt ? "mt-2" : ""}>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">{line.label}</p>
                  {line.link ? (
                    <a href={line.link} className="text-primary hover:underline">{line.value}</a>
                  ) : (
                    <p className="text-primary whitespace-pre-line">{line.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
        <div className="space-y-2 text-gray-600 dark:text-gray-400">
          {businessHours.map((hour, index) => (
            <p key={index}>{hour}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoSection;