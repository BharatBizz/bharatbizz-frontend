import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'; // If you're using Ant Design for buttons, otherwise you can use a standard button.

export const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
        <Button
          type="primary"
          className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-700 transition duration-200 ease-in-out"
          onClick={goToHome}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};
