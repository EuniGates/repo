import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import QrCodeIcon from './icons/QrCodeIcon';

const PackingIdModal = ({ isOpen, onClose, onConfirm, isEditing = false, currentId = '' }) => {
  const [uniqueId, setUniqueId] = useState(isEditing ? currentId : '');
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(uniqueId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Cover ID' : 'Enter Unique Cover ID'}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100 hover:text-gray-800">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-slate-100 rounded-full">
                    <QrCodeIcon className="h-10 w-10 text-slate-500" />
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
                {isEditing 
                    ? 'Enter the new Unique ID for this cover.'
                    : 'Please scan or enter the Unique ID from the cover skin before completing this stage.'
                }
            </p>
            <input
              type="text"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-gray-700 text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="e.g., CV-A1B2C3D4"
              autoFocus
            />
          </div>
          <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!uniqueId.trim()}
              className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Save ID' : 'Confirm & Complete'}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PackingIdModal;