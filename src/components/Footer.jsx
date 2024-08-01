import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 via-white to-green-500 p-8 text-black">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">BhaaratBizz</h2>
          <p className="text-sm mb-4">Empowering Your Business with Excellence</p>
          <p className="text-sm">123 Business Street, Innovation City, Country</p>
          <p className="text-sm">Email: <a href="mailto:contact@bhaaratbizz.com" className="underline">contact@bhaaratbizz.com</a></p>
          <p className="text-sm">Phone: +1234567890</p>
        </div>

        <div className="flex flex-col items-center md:items-end mb-6 md:mb-0">
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800" aria-label="Facebook"><FaFacebookF size={20} /></a>
            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600" aria-label="Twitter"><FaTwitter size={20} /></a>
            <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900" aria-label="LinkedIn"><FaLinkedinIn size={20} /></a>
            <a href="https://instagram.com" className="text-pink-500 hover:text-pink-700" aria-label="Instagram"><FaInstagram size={20} /></a>
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-gray-800">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-800">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 border-t border-black pt-4">
        <p className="text-sm">© 2024 BhaaratBizz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
