import React from 'react';
import XIcon from './icons/XIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ClaimConfirmationModalProps {
  onClose: () => void;
  claimDetails: {
    replacementType: string;
    shipDate: string;
  };
}

const ClaimConfirmationModal: React.FC<ClaimConfirmationModalProps> = ({ onClose, claimDetails }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-800">Claim Submitted Successfully</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8 text-center flex flex-col items-center space-y-4">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
            <p className="text-lg text-gray-700 max-w-sm mx-auto">
                A new <span className="font-bold text-indigo-600">{claimDetails.replacementType}</span> has been placed in production.
            </p>
            <div className="bg-slate-100 p-4 rounded-lg w-full">
                <p className="font-semibold text-gray-800">Approximate Ship Date:</p>
                <p className="text-xl font-bold text-gray-900">{claimDetails.shipDate}</p>
            </div>
        </div>

        <div className="flex justify-center p-6 bg-slate-50 rounded-b-2xl">
            <button 
                onClick={onClose} 
                className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Done
            </button>
        </div>
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

export default ClaimConfirmationModal;
