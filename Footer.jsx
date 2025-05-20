import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ navLinks }) => {
  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} Karnataka State Road Transport Corporation. All rights reserved.</p>
          <p className="mt-1">Designed for KSRTC Controllers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;