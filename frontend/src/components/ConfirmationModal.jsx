import React from 'react';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'danger' 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div 
        className="bg-white rounded-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-title" className="text-xl font-bold text-gray-800 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 ${
              type === 'danger' 
                ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' 
                : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
            }`}
          >
            {type === 'danger' ? 'Delete' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;