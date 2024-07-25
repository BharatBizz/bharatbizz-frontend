import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-200 p-8 rounded-lg shadow-lg text-center max-w-md"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-5xl font-extrabold text-blue-800 mb-4"
        >
          401
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-xl font-semibold text-slate-800 mb-2"
        >
          Unauthorized Access
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-slate-600 mb-6"
        >
          You don't have permission to access this page. Please log in or go back to the homepage.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex justify-center space-x-4"
        >
          <Link to="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
              Login
            </button>
          </Link>
          <Link to="/">
            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300">
              Home
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;
