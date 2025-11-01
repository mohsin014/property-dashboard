
import React, { useEffect } from 'react';

const StatusModal = ({ isOpen, onClose, type, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Auto close after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
          type === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <span className={`text-3xl ${
            type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {type === 'success' ? '✓' : '✕'}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold mb-2 ${
          type === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {type === 'success' ? 'Success!' : 'Error!'}
        </h3>

        {/* Message */}
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default StatusModal;