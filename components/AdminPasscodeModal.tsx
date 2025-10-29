import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import KeyIcon from './icons/KeyIcon';

interface AdminPasscodeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSCODE = '1234'; // Hardcoded for this example

const AdminPasscodeModal: React.FC<AdminPasscodeModalProps> = ({ onClose, onSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setError('');
      onSuccess();
    } else {
      setError('Incorrect passcode. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Authorization</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">Please enter the admin passcode to edit sensitive fields.</p>
            <div>
              <label htmlFor="passcode" className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError('');
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-100 border rounded-lg text-gray-700 focus:outline-none focus:bg-white transition ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent focus:ring-2 focus:ring-indigo-500'}`}
                  autoFocus
                />
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </div>

          <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Authorize
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

export default AdminPasscodeModal;
